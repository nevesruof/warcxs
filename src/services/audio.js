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

function resumeLocal() {
  if (
    !entered ||
    state.isAudioDisabled ||
    state.isClipPlaying ||
    state.isPlaybackInterrupted ||
    state.playbackSource !== 'none'
  )
    return;
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
  const volume = clamp(value);
  if (volume) lastVolume = volume;
  publish({ volume, isAudioDisabled: false });
  storeValue('site-global-volume', volume);
  getLocalAudio().volume = volume / 100;
  player?.setVolume?.(volume);
  mediaElements.forEach((base, element) => {
    element.volume = (base * volume) / 100;
  });
  resumeLocal();
}

function removePanel() {
  clearInterval(progressTimer);
  player?.destroy?.();
  player = null;
  playerReady = null;
  playerPanel?.remove();
  playerPanel = null;
}

function mountPanel(title) {
  if (playerPanel?.querySelector('#embedded-player-content')) return playerPanel;
  if (playerPanel) removePanel();
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
  playerPanel = panel;
  return panel;
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
  publish({ isAudioPlaying: false, playbackSource: 'none', activeVideoId: null });
  resumeLocal();
}

async function ensurePlayer() {
  if (playerReady) return playerReady;
  playerReady = loadYouTube()
    .then(
      (YT) =>
        new Promise((resolve, reject) => {
          mountPanel('Music player');
          const timer = setTimeout(() => reject(new Error('Player unavailable')), 10000);
          player = new YT.Player('embedded-player-content', {
            width: '356',
            height: '200',
            playerVars: { controls: 1, playsinline: 1, origin: location.origin, rel: 0 },
            events: {
              onReady: () => {
                clearTimeout(timer);
                player.setVolume(state.volume);
                resolve(player);
              },
              onStateChange: (event) => {
                const playing = event.data === YT.PlayerState.PLAYING;
                if (playing) getLocalAudio().pause();
                publish({ isAudioPlaying: playing });
                if (event.data === YT.PlayerState.ENDED)
                  stopPlayback({ resumeSpotify: state.playbackSource === 'manual' });
              },
              onAutoplayBlocked: resumeOnFailure,
              onError: () => {
                clearTimeout(timer);
                reject(new Error('Video cannot be embedded'));
                resumeOnFailure();
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

async function playVideo(value, startTime = 0, source = 'manual') {
  const id = videoId(value);
  if (!id || state.isAudioDisabled || !entered) return false;
  const request = ++generation;
  const requestedAt = Date.now();
  try {
    const yt = await ensurePlayer();
    if (request !== generation) return false;
    const offset = Math.max(
      0,
      startTime + (source === 'spotify' ? (Date.now() - requestedAt) / 1000 : 0),
    );
    publish({ playbackSource: source, activeVideoId: id, playbackTime: offset });
    yt.loadVideoById({ videoId: id, startSeconds: offset });
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
    if (request === generation) resumeOnFailure();
    return false;
  }
}

function openSpotifyEmbed(url) {
  const id = /open\.spotify\.com\/track\/([A-Za-z0-9]+)/.exec(url || '')?.[1];
  if (!id) return false;
  removePanel();
  const panel = mountPanel('Spotify player');
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
  if (state.isAudioDisabled || !entered) return false;
  const request = ++generation;
  const requestedAt = Date.now();
  try {
    const result = await requestJson(`/api/playback?${new URLSearchParams({ track, artist })}`);
    if (request !== generation) return false;
    if (result.videoId) {
      const offset = startTime + (source === 'spotify' ? (Date.now() - requestedAt) / 1000 : 0);
      return playVideo(result.videoId, offset, source);
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
  removePanel();
  publish({
    playbackSource: 'none',
    activeVideoId: null,
    isAudioPlaying: false,
    playbackTime: 0,
    playbackDuration: 0,
  });
  if (resumeSpotify && spotifyResume) {
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
    entered = true;
    resumeLocal();
    return true;
  },
  toggleMute() {
    setVolume(state.volume ? 0 : lastVolume);
  },
  disableAudioForever() {
    entered = true;
    setVolume(0);
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
  },
  resumeAfterExternalMedia() {
    publish({ isPlaybackInterrupted: false });
    if (state.playbackSource !== 'none') player?.playVideo?.();
    else resumeLocal();
  },
  registerMediaElement(element, { baseVolume = 1 } = {}) {
    mediaElements.set(element, clamp(baseVolume, 1));
    element.volume = (clamp(baseVolume, 1) * state.volume) / 100;
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
