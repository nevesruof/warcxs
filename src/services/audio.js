import { requestJson, readStored, storeValue } from './request.js';

const clamp = (value, max = 100) => Math.min(max, Math.max(0, Number(value) || 0));
const initialVolume = readStored('site-global-volume', 30);
const listeners = new Set();
const mediaElements = new Map();
let state = {
  volume: clamp(initialVolume),
  isAudioDisabled: false,
  isAudioPlaying: false,
  isClipPlaying: false,
  isPlaybackInterrupted: false,
  isPlayerPrimingReady: true,
  playbackSource: 'none',
  activeVideoId: null,
  playbackTime: 0,
  playbackDuration: 0,
  manualPlaybackDetails: null,
};
let entered = false;
let localAudio;
let player;
let playerReady;
let generation = 0;
let progressTimer;
let spotifyResume;
let playerPanel;
let lastVolume = state.volume || 30;
let localBlocked = false;
let youtubeBlocked = false;
let audioContext;
let localGain;
let engineHost;
let embedPanel;
let candidates = [];
let autoplayWatch;

function publish(patch) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}

function getLocalAudio() {
  if (!localAudio) {
    localAudio = new Audio('/assets/entry-music.mp3');
    localAudio.loop = true;
    localAudio.preload = 'auto';
    localAudio.volume = state.volume / 100;
  }
  return localAudio;
}

// iOS ignores HTMLMediaElement.volume, so the level is applied through a GainNode.
// The graph is only created during a user gesture so the context can actually start.
function attachGain() {
  if (localGain || state.isAudioDisabled) return;
  try {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    audioContext = new Context();
    const source = audioContext.createMediaElementSource(getLocalAudio());
    localGain = audioContext.createGain();
    localGain.gain.value = state.volume / 100;
    source.connect(localGain).connect(audioContext.destination);
    getLocalAudio().volume = 1;
  } catch {
    localGain = null;
  }
}

function applyLocalLevel() {
  const level = state.isAudioDisabled ? 0 : state.volume / 100;
  const audio = getLocalAudio();
  if (localGain) localGain.gain.value = level;
  else audio.volume = level;
  audio.muted = level === 0;
  if (level === 0) audio.pause();
}

function applyPlayerLevel() {
  if (!player) return;
  try {
    if (state.isAudioDisabled || state.volume === 0) player.mute?.();
    else {
      player.unMute?.();
      player.setVolume?.(state.volume);
    }
  } catch {
    /* The player may still be loading. */
  }
}

function resumeLocal() {
  if (
    !entered ||
    state.isAudioDisabled ||
    state.volume === 0 ||
    state.isClipPlaying ||
    state.isPlaybackInterrupted ||
    state.playbackSource !== 'none'
  )
    return;
  audioContext?.resume?.().catch(() => {});
  getLocalAudio()
    .play()
    .then(() => {
      localBlocked = false;
    })
    .catch(() => {
      localBlocked = true;
    });
}

function setVolume(value) {
  if (state.isAudioDisabled) return;
  const volume = clamp(value);
  if (volume) lastVolume = volume;
  publish({ volume });
  storeValue('site-global-volume', volume);
  applyLocalLevel();
  applyPlayerLevel();
  mediaElements.forEach((base, element) => {
    element.volume = (base * volume) / 100;
  });
  if (volume) resumeLocal();
}

function removeEmbed() {
  embedPanel?.remove();
  embedPanel = null;
}

function mountEmbed(title) {
  removeEmbed();
  const panel = document.createElement('aside');
  panel.className = 'embedded-player';
  panel.setAttribute('aria-label', title);
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'embedded-player__close';
  close.textContent = '×';
  close.setAttribute('aria-label', 'Close music player');
  close.addEventListener('click', () => stopPlayback({ resumeSpotify: false }));
  const content = document.createElement('div');
  content.id = 'embedded-player-content';
  panel.append(close, content);
  document.body.append(panel);
  embedPanel = panel;
  return panel;
}

// Off-screen (not display:none, which browsers throttle) 200x200 host for the audio-only YouTube engine.
function mountEngine() {
  if (engineHost?.isConnected) return engineHost;
  engineHost = document.createElement('div');
  engineHost.className = 'audio-engine';
  engineHost.setAttribute('aria-hidden', 'true');
  const target = document.createElement('div');
  target.id = 'audio-engine-player';
  engineHost.append(target);
  document.body.append(engineHost);
  return engineHost;
}

let youtubeScript;
function loadYouTube() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeScript) return youtubeScript;
  youtubeScript = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('YouTube did not respond')), 10000);
    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timeout);
      resolve(window.YT);
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('YouTube unavailable'));
    };
    document.head.append(script);
  }).catch((error) => {
    youtubeScript = null;
    throw error;
  });
  return youtubeScript;
}

function resumeOnFailure() {
  clearTimeout(autoplayWatch);
  publish({ isAudioPlaying: false, playbackSource: 'none', activeVideoId: null });
  resumeLocal();
}

async function ensurePlayer() {
  if (playerReady) return playerReady;
  playerReady = loadYouTube()
    .then(
      (YT) =>
        new Promise((resolve, reject) => {
          mountEngine();
          const timer = setTimeout(() => reject(new Error('Player unavailable')), 10000);
          player = new YT.Player('audio-engine-player', {
            width: '200',
            height: '200',
            playerVars: {
              controls: 0,
              disablekb: 1,
              fs: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              origin: location.origin,
              rel: 0,
            },
            events: {
              onReady: () => {
                clearTimeout(timer);
                applyPlayerLevel();
                resolve(player);
              },
              onStateChange: (event) => {
                const playing = event.data === YT.PlayerState.PLAYING;
                if (playing) {
                  clearTimeout(autoplayWatch);
                  youtubeBlocked = false;
                  getLocalAudio().pause();
                }
                publish({ isAudioPlaying: playing });
                if (event.data === YT.PlayerState.ENDED)
                  stopPlayback({ resumeSpotify: state.playbackSource === 'manual' });
              },
              onAutoplayBlocked: () => {
                youtubeBlocked = true;
              },
              onError: () => {
                clearTimeout(timer);
                reject(new Error('Video cannot be embedded'));
                tryNextCandidate();
              },
            },
          });
        }),
    )
    .catch((error) => {
      playerReady = null;
      throw error;
    });
  return playerReady;
}

// Official-audio uploads are often not embeddable: fall through to the next search result.
function tryNextCandidate() {
  const next = candidates.shift();
  if (next && !state.isAudioDisabled) {
    const elapsed = next.source === 'spotify' ? (Date.now() - next.at) / 1000 : 0;
    void playVideo(next.id, next.offset + elapsed, next.source, { keepCandidates: true });
  } else resumeOnFailure();
}

function watchAutoplay(request) {
  clearTimeout(autoplayWatch);
  autoplayWatch = setTimeout(() => {
    if (request === generation && !state.isAudioPlaying && state.playbackSource !== 'none')
      youtubeBlocked = true;
  }, 3000);
}

function retryYoutube() {
  if (!youtubeBlocked || !player || state.isAudioDisabled) return;
  youtubeBlocked = false;
  applyPlayerLevel();
  player.playVideo?.();
}

function videoId(value) {
  if (/^[\w-]{11}$/.test(value || '')) return value;
  try {
    const url = new URL(value);
    if (url.hostname === 'youtu.be') return url.pathname.slice(1).split('/')[0];
    if (['youtube.com', 'www.youtube.com', 'www.youtube-nocookie.com'].includes(url.hostname))
      return url.searchParams.get('v');
  } catch {
    return null;
  }
  return null;
}

async function playVideo(value, startTime = 0, source = 'manual', { keepCandidates = false } = {}) {
  const id = videoId(value);
  if (!id || state.isAudioDisabled || state.volume === 0 || !entered) return false;
  if (!keepCandidates) candidates = [];
  const request = ++generation;
  const requestedAt = Date.now();
  removeEmbed();
  try {
    const yt = await ensurePlayer();
    if (request !== generation) return false;
    const offset = Math.max(
      0,
      startTime + (source === 'spotify' ? (Date.now() - requestedAt) / 1000 : 0),
    );
    publish({ playbackSource: source, activeVideoId: id, playbackTime: offset });
    applyPlayerLevel();
    yt.loadVideoById({ videoId: id, startSeconds: offset });
    watchAutoplay(request);
    clearInterval(progressTimer);
    progressTimer = setInterval(() => {
      if (!document.hidden && player)
        publish({
          playbackTime: yt.getCurrentTime() || 0,
          playbackDuration: yt.getDuration() || 0,
        });
    }, 500);
    return true;
  } catch {
    if (request === generation) tryNextCandidate();
    return false;
  }
}

function openSpotifyEmbed(url) {
  const id = /open\.spotify\.com\/track\/([A-Za-z0-9]+)/.exec(url || '')?.[1];
  if (!id || state.isAudioDisabled) return false;
  player?.stopVideo?.();
  const panel = mountEmbed('Spotify player');
  const frame = document.createElement('iframe');
  frame.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
  frame.title = 'Spotify track player';
  frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  frame.height = '152';
  frame.width = '100%';
  panel.querySelector('#embedded-player-content').replaceWith(frame);
  getLocalAudio().pause();
  publish({ playbackSource: 'manual', isAudioPlaying: false, activeVideoId: null });
  return true;
}

async function playTrack(track, artist, startTime = 0, source = 'spotify') {
  if (state.isAudioDisabled || state.volume === 0 || !entered) return false;
  const request = ++generation;
  const requestedAt = Date.now();
  try {
    const result = await requestJson(`/api/playback?${new URLSearchParams({ track, artist })}`);
    if (request !== generation) return false;
    const ids = [...new Set([result.videoId, ...(result.videoIds || [])].filter(Boolean))];
    if (ids.length) {
      const offset = startTime + (source === 'spotify' ? (Date.now() - requestedAt) / 1000 : 0);
      candidates = ids.slice(1).map((id) => ({ id, offset, source, at: Date.now() }));
      return playVideo(ids[0], offset, source, { keepCandidates: true });
    }
  } catch {
    if (request !== generation) return false;
  }
  if (source === 'manual') return openSpotifyEmbed(state.manualPlaybackDetails?.spotifyUrl);
  resumeLocal();
  return false;
}

function stopPlayback({ resumeSpotify = false } = {}) {
  generation++;
  candidates = [];
  clearTimeout(autoplayWatch);
  clearInterval(progressTimer);
  removeEmbed();
  try {
    player?.stopVideo?.();
  } catch {
    /* The engine stays alive so the next track starts instantly. */
  }
  publish({
    playbackSource: 'none',
    activeVideoId: null,
    isAudioPlaying: false,
    playbackTime: 0,
    playbackDuration: 0,
  });
  if (resumeSpotify && spotifyResume && !state.isAudioDisabled) {
    const request = spotifyResume;
    const offset = request.startTime + (Date.now() - request.at) / 1000;
    if (request.videoUrlOrId) void playVideo(request.videoUrlOrId, offset, 'spotify');
    else void playTrack(request.track, request.artist, offset, 'spotify');
  }
  resumeLocal();
}

function setManualPlaybackDetails(value) {
  publish({
    manualPlaybackDetails: typeof value === 'function' ? value(state.manualPlaybackDetails) : value,
  });
}

const actions = {
  playTrack,
  playVideo,
  stopPlayback,
  setVolume,
  setManualPlaybackDetails,
  primePlayer() {
    if (state.isAudioDisabled) return false;
    entered = true;
    attachGain();
    applyLocalLevel();
    resumeLocal();
    void ensurePlayer().catch(() => {});
    return true;
  },
  toggleMute() {
    setVolume(state.volume ? 0 : lastVolume);
  },
  // "Enter without audio": nothing may sound, from any source, and the volume control disappears.
  disableAudioForever() {
    entered = true;
    generation++;
    candidates = [];
    clearTimeout(autoplayWatch);
    clearInterval(progressTimer);
    removeEmbed();
    publish({
      isAudioDisabled: true,
      isAudioPlaying: false,
      playbackSource: 'none',
      activeVideoId: null,
      playbackTime: 0,
      playbackDuration: 0,
    });
    applyLocalLevel();
    try {
      player?.stopVideo?.();
      player?.mute?.();
    } catch {
      /* Nothing is playing yet. */
    }
    mediaElements.forEach((_base, element) => {
      element.muted = true;
    });
  },
  updateTime(seconds) {
    if (
      player &&
      state.playbackSource === 'spotify' &&
      Math.abs(player.getCurrentTime() - seconds) > 1.5
    )
      player.seekTo(seconds, true);
  },
  seekToTime(seconds) {
    player?.seekTo?.(Math.max(0, seconds), true);
  },
  queueSpotifyResume(request) {
    spotifyResume = { ...request, at: Date.now() };
  },
  queueClipSpotifyPlayback(request) {
    spotifyResume = { ...request, at: Date.now() };
  },
  setClipPlaybackActive(active) {
    publish({ isClipPlaying: active });
    if (active) getLocalAudio().pause();
    else resumeLocal();
  },
  finishClipPlayback() {
    publish({ isClipPlaying: false });
    resumeLocal();
  },
  pauseForExternalMedia() {
    publish({ isPlaybackInterrupted: true });
    getLocalAudio().pause();
    player?.pauseVideo?.();
    clearTimeout(autoplayWatch);
  },
  resumeAfterExternalMedia() {
    publish({ isPlaybackInterrupted: false });
    if (state.playbackSource !== 'none') player?.playVideo?.();
    else resumeLocal();
  },
  registerMediaElement(element, { baseVolume = 1 } = {}) {
    mediaElements.set(element, clamp(baseVolume, 1));
    element.volume = (clamp(baseVolume, 1) * state.volume) / 100;
    element.muted = state.isAudioDisabled;
    return () => mediaElements.delete(element);
  },
};

export function createAudioComponents(React, jsx) {
  const Context = React.createContext(null);
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  function AudioProvider({ children }) {
    const current = React.useSyncExternalStore(subscribe, () => state);
    React.useEffect(() => {
      const retry = () => {
        if (localBlocked) resumeLocal();
        retryYoutube();
      };
      document.addEventListener('pointerdown', retry);
      document.addEventListener('keydown', retry);
      return () => {
        document.removeEventListener('pointerdown', retry);
        document.removeEventListener('keydown', retry);
      };
    }, []);
    return jsx(Context.Provider, { value: { ...current, ...actions }, children });
  }
  return { AudioProvider, useAudio: () => React.useContext(Context) };
}
