import test from "node:test";
import assert from "node:assert/strict";

// ---- minimal browser stubs -------------------------------------------------
const storage = new Map();
let playbackReply = {
  videoId: "aaaaaaaaaaa",
  videoIds: ["aaaaaaaaaaa", "bbbbbbbbbbb"],
};
let playbackDelay = 0;
let playbackRequests = 0;
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
};
globalThis.fetch = async () => {
  playbackRequests++;
  if (playbackDelay)
    await new Promise((resolve) => setTimeout(resolve, playbackDelay));
  return new Response(JSON.stringify(playbackReply));
};
globalThis.location = { origin: "https://example.test" };
globalThis.window = globalThis;
Object.defineProperty(globalThis, "navigator", {
  value: { mediaSession: {} },
  configurable: true,
});

const audios = [];
class FakeAudio {
  constructor(src) {
    this.src = src;
    this.volume = 1;
    this.muted = false;
    this.paused = true;
    this.plays = 0;
    audios.push(this);
  }
  play() {
    this.plays++;
    this.paused = false;
    return Promise.resolve();
  }
  pause() {
    this.paused = true;
  }
}
globalThis.Audio = FakeAudio;

function element(tag) {
  const node = {
    tag,
    children: [],
    attrs: {},
    isConnected: false,
    className: "",
    append(...items) {
      items.forEach((item) => {
        item.isConnected = true;
        node.children.push(item);
      });
    },
    setAttribute(name, value) {
      node.attrs[name] = value;
    },
    addEventListener() {},
    remove() {
      node.isConnected = false;
      node.parent?.children.splice(node.parent.children.indexOf(node), 1);
    },
    querySelector: () => element("div"),
    replaceWith() {},
  };
  return node;
}
const body = element("body");
const head = element("head");
const documentListeners = new Map();
globalThis.document = {
  hidden: false,
  body,
  head,
  createElement: element,
  addEventListener(type, listener) {
    if (!documentListeners.has(type)) documentListeners.set(type, new Set());
    documentListeners.get(type).add(listener);
  },
  removeEventListener(type, listener) {
    documentListeners.get(type)?.delete(listener);
  },
};

class FakePlayer {
  static instances = [];
  constructor(id, options) {
    this.id = id;
    this.options = options;
    this.loaded = [];
    this.cued = [];
    this.played = 0;
    this.muted = false;
    this.stopped = 0;
    this.paused = 0;
    this.seeks = [];
    FakePlayer.instances.push(this);
    queueMicrotask(() => options.events.onReady());
  }
  loadVideoById(request) {
    this.loaded.push(request);
  }
  cueVideoById(request) {
    this.cued.push(request);
  }
  mute() {
    this.muted = true;
  }
  unMute() {
    this.muted = false;
  }
  setVolume(value) {
    this.volumeValue = value;
  }
  stopVideo() {
    this.stopped++;
  }
  getCurrentTime() {
    return 0;
  }
  getDuration() {
    return 200;
  }
  playVideo() {
    this.played++;
  }
  pauseVideo() {
    this.paused++;
    this.options.events.onStateChange({ data: 2 });
  }
  seekTo(time) {
    this.seeks.push(time);
  }
  destroy() {}
}
globalThis.YT = { Player: FakePlayer, PlayerState: { PLAYING: 1, ENDED: 0 } };

let scenario = 0;
async function freshAudio() {
  scenario++;
  playbackDelay = 0;
  playbackRequests = 0;
  audios.length = 0;
  FakePlayer.instances.length = 0;
  body.children.length = 0;
  head.children.length = 0;
  documentListeners.clear();
  storage.clear();
  delete globalThis.YT;
  globalThis.YT = { Player: FakePlayer, PlayerState: { PLAYING: 1, ENDED: 0 } };
  globalThis.onYouTubeIframeAPIReady = undefined;
  const { createAudioComponents, updateAudioPresence } = await import(
    `../src/services/audio.js?case=${scenario}`
  );
  const React = {
    createContext: () => ({ Provider: "provider" }),
    useSyncExternalStore: (_subscribe, snapshot) => snapshot(),
    useEffect: (setup) => setup(),
    useContext: () => null,
  };
  const { AudioProvider } = createAudioComponents(
    React,
    (_type, props) => props,
  );
  const audio = () => AudioProvider({ children: null }).value;
  audio.updatePresence = updateAudioPresence;
  return audio;
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 5));

test("hidden engine: YouTube plays audio-only from the Spotify offset with no visible window", async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  await settle();
  const ok = await audio().playTrack("Song", "Artist", 42, "spotify");
  assert.equal(ok, true);
  const [engine] = FakePlayer.instances;
  assert.equal(engine.options.width, "200");
  assert.equal(engine.options.playerVars.controls, 0);
  assert.ok(engine.loaded[0].startSeconds >= 42);
  assert.ok(body.children.some((node) => node.className === "audio-engine"));
  assert.ok(
    !body.children.some((node) => node.className === "embedded-player"),
  );
  audio().stopPlayback();
});

test("embed-blocked videos fall through to the next search result", async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  await settle();
  await audio().playTrack("Song", "Artist", 10, "spotify");
  const [engine] = FakePlayer.instances;
  engine.options.events.onError();
  await settle();
  assert.equal(engine.loaded.at(-1).videoId, "bbbbbbbbbbb");
  audio().stopPlayback();
});

test("volume 0 mutes the streaming engine; raising it restores the selected level", async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  await settle();
  const [engine] = FakePlayer.instances;
  audio().setVolume(0);
  assert.equal(engine.muted, true);
  assert.equal(await audio().playTrack("Song", "Artist", 0, "spotify"), false);
  audio().setVolume(40);
  assert.equal(engine.muted, false);
  assert.equal(engine.volumeValue, 40);
  assert.equal(await audio().playTrack("Song", "Artist", 0, "spotify"), true);
  audio().stopPlayback();
});

test("entry and playback transitions never create or resume a local audio fallback", async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  audio.updatePresence({
    listening_to_spotify: true,
    spotify: {
      song: "Song",
      artist: "Artist",
      timestamps: { end: Date.now() + 60000 },
    },
  });
  audio().setVolume(70);
  audio().resumeAfterExternalMedia();
  await settle();
  assert.equal(FakePlayer.instances[0].loaded.length, 0);
  await audio().playTrack("Song", "Artist", 0, "spotify");
  audio().stopPlayback();
  audio.updatePresence({ listening_to_spotify: false });
  audio().setClipPlaybackActive(true);
  audio().finishClipPlayback();
  audio().pauseForExternalMedia();
  audio().resumeAfterExternalMedia();
  assert.equal(audios.length, 0);
  assert.equal(audio().playbackSource, "none");
  audio().disableAudioForever();
});

test("enter without audio: nothing sounds, volume control is flagged hidden, engine never starts", async () => {
  const audio = await freshAudio();
  audio().disableAudioForever();
  assert.equal(audio().isAudioDisabled, true);
  assert.equal(audio().primePlayer(), false);
  assert.equal(await audio().playTrack("Song", "Artist", 0, "spotify"), false);
  assert.equal(await audio().playVideo("aaaaaaaaaaa", 0, "manual"), false);
  audio().setVolume(80);
  assert.notEqual(audio().volume, 80);
  assert.ok(audios.every((item) => item.plays === 0));
  assert.equal(FakePlayer.instances.length, 0);
  assert.equal(body.children.length, 0);
});

test("silent entry after audio was primed mutes everything already running", async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  await settle();
  await audio().playTrack("Song", "Artist", 5, "spotify");
  audio().disableAudioForever();
  const [engine] = FakePlayer.instances;
  assert.equal(engine.muted, true);
  assert.ok(engine.stopped > 0);
  assert.equal(audios.length, 0);
  assert.equal(audio().playbackSource, "none");
});

test("prepared songs dispatch playback without another lookup or reloading the video", async () => {
  const audio = await freshAudio();
  const song = {
    id: "recent:prepared",
    trackName: "Prepared Song",
    artistName: "Artist",
  };
  audio().primePlayer();
  playbackDelay = 40;
  assert.equal(await audio().prepareSong(song), true);
  const [engine] = FakePlayer.instances;
  assert.equal(engine.cued.length, 1);
  assert.equal(engine.played, 0);
  await audio().prepareSong(song);
  await audio().prepareSong(song);
  assert.equal(
    engine.cued.length,
    1,
    "Focus and hover must not restart the same prepared video",
  );
  await audio().prepareSong(
    { trackName: "Adjacent Song", artistName: "Artist" },
    { cue: false },
  );
  assert.equal(engine.cued.length, 1);
  const requestsAfterPreparation = playbackRequests;
  const playing = audio().toggleSong(song);
  assert.equal(
    engine.played,
    1,
    "A cached track dispatches playback within the click handler",
  );
  assert.equal(await playing, true);
  assert.equal(playbackRequests, requestsAfterPreparation);
  assert.equal(engine.loaded.length, 0);
  assert.equal(engine.played, 1);
  assert.equal(audio().manualPlaybackDetails.id, song.id);
  assert.equal(audio().playbackSource, "manual");
  await audio().toggleSong(song);
  assert.equal(audio().playbackSource, "none");
  assert.equal(engine.stopped, 0, "Stop must preserve the loaded stream");
  assert.equal(engine.paused, 1);
  await audio().toggleSong(song);
  assert.equal(engine.loaded.length, 0);
  assert.equal(engine.seeks.at(-1), 0);
  assert.equal(engine.played, 2);
  audio().stopPlayback();
});

test("Stop cancels a pending song so a delayed response cannot start it later", async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  await settle();
  playbackDelay = 40;
  const song = {
    id: "recent:cancelled",
    trackName: "Cancelled Song",
    artistName: "Artist",
  };
  const pending = audio().toggleSong(song);
  assert.equal(audio().isAudioLoading, true);
  assert.equal(audio().playbackSource, "manual");
  await audio().toggleSong(song);
  assert.equal(await pending, false);
  assert.equal(FakePlayer.instances[0].loaded.length, 0);
  assert.equal(audio().playbackSource, "none");
  assert.equal(audio().isAudioLoading, false);
});

test("preparing a different song never interrupts an active stream", async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  await audio().playTrack("Live Song", "Artist", 15, "spotify");
  const [engine] = FakePlayer.instances;
  await audio().prepareSong({
    trackName: "Another Song",
    artistName: "Artist",
  });
  assert.equal(engine.cued.length, 0);
  assert.equal(engine.loaded.length, 1);
  assert.equal(audio().playbackSource, "spotify");
  audio().stopPlayback();
});

test("mobile playback retries on an activated click and cannot restart a stopped song", async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  await settle();
  await audio().playVideo("aaaaaaaaaaa", 0, "manual");
  const [engine] = FakePlayer.instances;
  engine.options.events.onAutoplayBlocked();
  const beforeRetry = engine.played;
  assert.ok(documentListeners.has("click"));
  assert.equal(documentListeners.has("pointerdown"), false);
  for (const listener of documentListeners.get("click")) listener();
  assert.equal(engine.played, beforeRetry + 1);
  engine.options.events.onAutoplayBlocked();
  audio().stopPlayback();
  for (const listener of documentListeners.get("click")) listener();
  assert.equal(engine.played, beforeRetry + 1);
});
