import { readStored, storeValue } from "./request.js";
import { resolveTrack, parseVideoId } from "./playback-cache.js";

const clamp = (value, max = 100) =>
  Math.min(max, Math.max(0, Number(value) || 0));
const initialVolume = readStored("site-global-volume", 30);
const listeners = new Set();
const mediaElements = new Map();
let state = {
  volume: clamp(initialVolume),
  isAudioDisabled: false,
  isAudioPlaying: false,
  isAudioLoading: false,
  isClipPlaying: false,
  isPlaybackInterrupted: false,
  isPlayerPrimingReady: true,
  playbackSource: "none",
  activeVideoId: null,
  playbackTime: 0,
  playbackDuration: 0,
  manualPlaybackDetails: null,
};
let entered = false;
let player;
let playerReady;
let generation = 0;
let progressTimer;
let spotifyResume;
let lastVolume = state.volume || 30;
let youtubeBlocked = false;
let engineHost;
let embedPanel;
let candidates = [];
let autoplayWatch;
let preparedVideoId;
let preparation = 0;

export function updateAudioPresence(presence) {
  const spotify = presence?.listening_to_spotify ? presence.spotify : null;
  if (spotify?.timestamps?.end > Date.now() && !state.isAudioDisabled)
    void resolveTrack(spotify.song, spotify.artist).catch(() => {});
}

function publish(patch) {
  if (
    Object.entries(patch).every(([key, value]) => Object.is(state[key], value))
  )
    return;
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
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

function setVolume(value) {
  if (state.isAudioDisabled) return;
  const volume = clamp(value);
  if (volume) lastVolume = volume;
  publish({ volume });
  storeValue("site-global-volume", volume);
  applyPlayerLevel();
  mediaElements.forEach((base, element) => {
    element.volume = (base * volume) / 100;
  });
}

function removeEmbed() {
  embedPanel?.remove();
  embedPanel = null;
}

function mountEmbed(title) {
  removeEmbed();
  const panel = document.createElement("aside");
  panel.className = "embedded-player";
  panel.setAttribute("aria-label", title);
  const close = document.createElement("button");
  close.type = "button";
  close.className = "embedded-player__close";
  close.textContent = "×";
  close.setAttribute("aria-label", "Close music player");
  close.addEventListener("click", () => stopPlayback({ resumeSpotify: false }));
  const content = document.createElement("div");
  content.id = "embedded-player-content";
  panel.append(close, content);
  document.body.append(panel);
  embedPanel = panel;
  return panel;
}

// Off-screen (not display:none, which browsers throttle) 200x200 host for the audio-only YouTube engine.
function mountEngine() {
  if (engineHost?.isConnected) return engineHost;
  engineHost = document.createElement("div");
  engineHost.className = "audio-engine";
  engineHost.setAttribute("aria-hidden", "true");
  const target = document.createElement("div");
  target.id = "audio-engine-player";
  engineHost.append(target);
  document.body.append(engineHost);
  return engineHost;
}

let youtubeScript;
function loadYouTube() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeScript) return youtubeScript;
  youtubeScript = new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("YouTube did not respond")),
      10000,
    );
    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timeout);
      resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error("YouTube unavailable"));
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
  clearInterval(progressTimer);
  publish({
    isAudioPlaying: false,
    isAudioLoading: false,
    playbackSource: "none",
    activeVideoId: null,
  });
}

async function ensurePlayer() {
  if (playerReady) return playerReady;
  playerReady = loadYouTube()
    .then(
      (YT) =>
        new Promise((resolve, reject) => {
          if (state.isAudioDisabled) return reject(new Error("Audio disabled"));
          mountEngine();
          const timer = setTimeout(
            () => reject(new Error("Player unavailable")),
            10000,
          );
          player = new YT.Player("audio-engine-player", {
            width: "200",
            height: "200",
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
                }
                if (state.playbackSource !== "none")
                  publish({
                    isAudioPlaying: playing,
                    ...(playing
                      ? { isAudioLoading: false }
                      : event.data === YT.PlayerState.BUFFERING
                        ? { isAudioLoading: true }
                        : {}),
                  });
                if (
                  event.data === YT.PlayerState.ENDED &&
                  state.playbackSource !== "none"
                )
                  stopPlayback({
                    resumeSpotify: state.playbackSource === "manual",
                  });
              },
              onAutoplayBlocked: () => {
                youtubeBlocked = true;
              },
              onError: () => {
                clearTimeout(timer);
                reject(new Error("Video cannot be embedded"));
                tryNextCandidate();
              },
            },
          });
        }),
    )
    .catch((error) => {
      playerReady = null;
      player?.destroy?.();
      player = null;
      engineHost?.remove();
      engineHost = null;
      preparedVideoId = null;
      throw error;
    });
  return playerReady;
}

// Official-audio uploads are often not embeddable: fall through to the next search result.
function tryNextCandidate() {
  const next = candidates.shift();
  if (next && !state.isAudioDisabled) {
    const elapsed =
      next.source === "spotify" ? (Date.now() - next.at) / 1000 : 0;
    void playVideo(next.id, next.offset + elapsed, next.source, {
      keepCandidates: true,
    });
  } else resumeOnFailure();
}

function watchAutoplay(request) {
  clearTimeout(autoplayWatch);
  autoplayWatch = setTimeout(() => {
    if (
      request === generation &&
      !state.isAudioPlaying &&
      state.playbackSource !== "none"
    )
      youtubeBlocked = true;
  }, 3000);
}

function retryYoutube() {
  if (!youtubeBlocked || !player || state.isAudioDisabled) return;
  youtubeBlocked = false;
  applyPlayerLevel();
  player.playVideo?.();
}

async function prepareSong(song, { cue = true } = {}) {
  if (!entered || state.isAudioDisabled || !song?.trackName) return false;
  const request = cue ? ++preparation : preparation;
  try {
    const id = parseVideoId(song.youtubeUrl);
    const [result, yt] = await Promise.all([
      id ? { videoId: id } : resolveTrack(song.trackName, song.artistName),
      ensurePlayer(),
    ]);
    if (!result.videoId) return false;
    if (
      cue &&
      request === preparation &&
      state.playbackSource === "none" &&
      !state.isAudioDisabled &&
      !state.isClipPlaying &&
      !state.isPlaybackInterrupted
    ) {
      preparedVideoId = result.videoId;
      yt.cueVideoById?.({ videoId: preparedVideoId, startSeconds: 0 });
    }
    return true;
  } catch {
    return false;
  }
}

async function playVideo(
  value,
  startTime = 0,
  source = "manual",
  { keepCandidates = false } = {},
) {
  const id = parseVideoId(value);
  if (!id || state.isAudioDisabled || state.volume === 0 || !entered)
    return false;
  if (!keepCandidates) candidates = [];
  const request = ++generation;
  const requestedAt = Date.now();
  removeEmbed();
  publish({
    playbackSource: source,
    isAudioLoading: true,
    isAudioPlaying: false,
  });
  try {
    const yt = await ensurePlayer();
    if (request !== generation) return false;
    const offset = Math.max(
      0,
      startTime +
        (source === "spotify" ? (Date.now() - requestedAt) / 1000 : 0),
    );
    publish({
      playbackSource: source,
      activeVideoId: id,
      playbackTime: offset,
    });
    applyPlayerLevel();
    if (preparedVideoId === id && offset === 0) yt.playVideo();
    else yt.loadVideoById({ videoId: id, startSeconds: offset });
    preparedVideoId = null;
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
  const id = /open\.spotify\.com\/track\/([A-Za-z0-9]+)/.exec(url || "")?.[1];
  if (!id || state.isAudioDisabled) return false;
  player?.stopVideo?.();
  const panel = mountEmbed("Spotify player");
  const frame = document.createElement("iframe");
  frame.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
  frame.title = "Spotify track player";
  frame.allow =
    "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  frame.height = "152";
  frame.width = "100%";
  frame.setAttribute("allowtransparency", "true");
  panel.querySelector("#embedded-player-content").replaceWith(frame);
  publish({
    playbackSource: "manual",
    isAudioPlaying: false,
    isAudioLoading: false,
    activeVideoId: null,
  });
  return true;
}

async function playTrack(track, artist, startTime = 0, source = "spotify") {
  if (state.isAudioDisabled || state.volume === 0 || !entered) return false;
  const request = ++generation;
  const requestedAt = Date.now();
  publish({
    playbackSource: source,
    isAudioLoading: true,
    isAudioPlaying: false,
  });
  player?.pauseVideo?.();
  try {
    const [result] = await Promise.all([
      resolveTrack(track, artist),
      ensurePlayer(),
    ]);
    if (request !== generation) return false;
    const ids = [
      ...new Set([result.videoId, ...(result.videoIds || [])].filter(Boolean)),
    ];
    if (ids.length) {
      const offset =
        startTime +
        (source === "spotify" ? (Date.now() - requestedAt) / 1000 : 0);
      candidates = ids
        .slice(1)
        .map((id) => ({ id, offset, source, at: Date.now() }));
      return playVideo(ids[0], offset, source, { keepCandidates: true });
    }
  } catch {
    if (request !== generation) return false;
  }
  if (
    source === "manual" &&
    openSpotifyEmbed(state.manualPlaybackDetails?.spotifyUrl)
  )
    return true;
  resumeOnFailure();
  return false;
}

function toggleSong(song) {
  if (state.isAudioDisabled || !entered) return Promise.resolve(false);
  if (
    state.playbackSource === "manual" &&
    state.manualPlaybackDetails?.id === song.id
  ) {
    stopPlayback({ resumeSpotify: true });
    return Promise.resolve(false);
  }
  setManualPlaybackDetails(song);
  const id = parseVideoId(song.youtubeUrl);
  return id
    ? playVideo(id, 0, "manual")
    : playTrack(song.trackName, song.artistName, 0, "manual");
}

function stopPlayback({ resumeSpotify = false } = {}) {
  generation++;
  preparation++;
  candidates = [];
  clearTimeout(autoplayWatch);
  clearInterval(progressTimer);
  removeEmbed();
  preparedVideoId = null;
  publish({
    playbackSource: "none",
    activeVideoId: null,
    isAudioPlaying: false,
    isAudioLoading: false,
    playbackTime: 0,
    playbackDuration: 0,
  });
  try {
    player?.stopVideo?.();
  } catch {
    /* Keep the engine ready for the next track. */
  }
  if (resumeSpotify && spotifyResume && !state.isAudioDisabled) {
    const request = spotifyResume;
    const offset = request.startTime + (Date.now() - request.at) / 1000;
    if (request.videoUrlOrId)
      void playVideo(request.videoUrlOrId, offset, "spotify");
    else void playTrack(request.track, request.artist, offset, "spotify");
  }
}

function setManualPlaybackDetails(value) {
  publish({
    manualPlaybackDetails:
      typeof value === "function" ? value(state.manualPlaybackDetails) : value,
  });
}

const actions = {
  playTrack,
  playVideo,
  prepareSong,
  toggleSong,
  stopPlayback,
  setVolume,
  setManualPlaybackDetails,
  primePlayer() {
    if (state.isAudioDisabled) return false;
    entered = true;
    void ensurePlayer().catch(() => {});
    return true;
  },
  toggleMute() {
    setVolume(state.volume ? 0 : lastVolume);
  },
  // "Enter without audio": nothing may sound, from any source, and the volume control disappears.
  disableAudioForever() {
    entered = true;
    spotifyResume = null;
    generation++;
    candidates = [];
    clearTimeout(autoplayWatch);
    clearInterval(progressTimer);
    removeEmbed();
    publish({
      isAudioDisabled: true,
      isAudioPlaying: false,
      isAudioLoading: false,
      playbackSource: "none",
      activeVideoId: null,
      playbackTime: 0,
      playbackDuration: 0,
    });
    try {
      player?.stopVideo?.();
      player?.mute?.();
    } catch {
      /* Nothing is playing yet. */
    }
    mediaElements.forEach((_base, element) => {
      element.muted = true;
      element.pause();
    });
    if (navigator.mediaSession) navigator.mediaSession.metadata = null;
  },
  updateTime(seconds) {
    if (
      player &&
      state.playbackSource === "spotify" &&
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
  },
  finishClipPlayback() {
    publish({ isClipPlaying: false });
  },
  pauseForExternalMedia() {
    publish({ isPlaybackInterrupted: true });
    player?.pauseVideo?.();
    clearTimeout(autoplayWatch);
  },
  resumeAfterExternalMedia() {
    publish({ isPlaybackInterrupted: false });
    if (state.isAudioDisabled) return;
    if (state.playbackSource !== "none") player?.playVideo?.();
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
      document.addEventListener("pointerdown", retryYoutube);
      document.addEventListener("keydown", retryYoutube);
      return () => {
        document.removeEventListener("pointerdown", retryYoutube);
        document.removeEventListener("keydown", retryYoutube);
      };
    }, []);
    return jsx(Context.Provider, {
      value: { ...current, ...actions },
      children,
    });
  }
  return { AudioProvider, useAudio: () => React.useContext(Context) };
}
