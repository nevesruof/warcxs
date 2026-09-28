import test from 'node:test';
import assert from 'node:assert/strict';

// ---- minimal browser stubs -------------------------------------------------
const storage = new Map();
let playbackReply = { videoId: 'aaaaaaaaaaa', videoIds: ['aaaaaaaaaaa', 'bbbbbbbbbbb'] };
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
};
globalThis.fetch = async () => new Response(JSON.stringify(playbackReply));
globalThis.location = { origin: 'https://example.test' };
globalThis.window = globalThis;

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
    className: '',
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
    querySelector: () => element('div'),
    replaceWith() {},
  };
  return node;
}
const body = element('body');
const head = element('head');
globalThis.document = { hidden: false, body, head, createElement: element };

class FakePlayer {
  static instances = [];
  constructor(id, options) {
    this.id = id;
    this.options = options;
    this.loaded = [];
    this.muted = false;
    this.stopped = 0;
    FakePlayer.instances.push(this);
    queueMicrotask(() => options.events.onReady());
  }
  loadVideoById(request) {
    this.loaded.push(request);
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
  playVideo() {}
  pauseVideo() {}
  destroy() {}
}
globalThis.YT = { Player: FakePlayer, PlayerState: { PLAYING: 1, ENDED: 0 } };

let scenario = 0;
async function freshAudio({ webAudio = false } = {}) {
  scenario++;
  audios.length = 0;
  FakePlayer.instances.length = 0;
  body.children.length = 0;
  head.children.length = 0;
  storage.clear();
  delete globalThis.AudioContext;
  if (webAudio) {
    globalThis.AudioContext = class {
      state = 'running';
      destination = {};
      resume = async () => {};
      createMediaElementSource = () => ({ connect: (node) => ({ connect: () => node }) });
      createGain = () => ({ gain: { value: 1 }, connect: () => ({}) });
    };
  }
  delete globalThis.YT;
  globalThis.YT = { Player: FakePlayer, PlayerState: { PLAYING: 1, ENDED: 0 } };
  globalThis.onYouTubeIframeAPIReady = undefined;
  const { createAudioComponents } = await import(`../src/services/audio.js?case=${scenario}`);
  const React = {
    createContext: () => ({ Provider: 'provider' }),
    useSyncExternalStore: (_subscribe, snapshot) => snapshot(),
    useEffect: () => {},
    useContext: () => null,
  };
  const { AudioProvider } = createAudioComponents(React, (_type, props) => props);
  return () => AudioProvider({ children: null }).value;
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 5));

test('hidden engine: YouTube plays audio-only from the Spotify offset with no visible window', async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  await settle();
  const ok = await audio().playTrack('Song', 'Artist', 42, 'spotify');
  assert.equal(ok, true);
  const [engine] = FakePlayer.instances;
  assert.equal(engine.options.width, '200');
  assert.equal(engine.options.playerVars.controls, 0);
  assert.ok(engine.loaded[0].startSeconds >= 42);
  assert.ok(body.children.some((node) => node.className === 'audio-engine'));
  assert.ok(!body.children.some((node) => node.className === 'embedded-player'));
  audio().stopPlayback();
});

test('embed-blocked videos fall through to the next search result', async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  await settle();
  await audio().playTrack('Song', 'Artist', 10, 'spotify');
  const [engine] = FakePlayer.instances;
  engine.options.events.onError();
  await settle();
  assert.equal(engine.loaded.at(-1).videoId, 'bbbbbbbbbbb');
  audio().stopPlayback();
});

test('volume 0 silences the local track and blocks streaming; raising it resumes', async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  const [local] = audios;
  assert.equal(local.paused, false);
  audio().setVolume(0);
  assert.equal(local.paused, true);
  assert.equal(local.muted, true);
  assert.equal(await audio().playTrack('Song', 'Artist', 0, 'spotify'), false);
  audio().setVolume(40);
  assert.equal(local.paused, false);
  assert.equal(local.muted, false);
  assert.equal(local.volume, 0.4);
});

test('gain node carries the level where element.volume is ignored (iOS)', async () => {
  const audio = await freshAudio({ webAudio: true });
  audio().primePlayer();
  const [local] = audios;
  audio().setVolume(0);
  assert.equal(local.muted, true);
  audio().setVolume(40);
  assert.equal(local.volume, 1);
  assert.equal(local.muted, false);
});

test('enter without audio: nothing sounds, volume control is flagged hidden, engine never starts', async () => {
  const audio = await freshAudio();
  audio().disableAudioForever();
  assert.equal(audio().isAudioDisabled, true);
  assert.equal(audio().primePlayer(), false);
  assert.equal(await audio().playTrack('Song', 'Artist', 0, 'spotify'), false);
  assert.equal(await audio().playVideo('aaaaaaaaaaa', 0, 'manual'), false);
  audio().setVolume(80);
  assert.notEqual(audio().volume, 80);
  assert.ok(audios.every((item) => item.plays === 0));
  assert.equal(FakePlayer.instances.length, 0);
  assert.equal(body.children.length, 0);
});

test('silent entry after audio was primed mutes everything already running', async () => {
  const audio = await freshAudio();
  audio().primePlayer();
  await settle();
  await audio().playTrack('Song', 'Artist', 5, 'spotify');
  audio().disableAudioForever();
  const [engine] = FakePlayer.instances;
  assert.equal(engine.muted, true);
  assert.ok(engine.stopped > 0);
  assert.equal(audios[0].muted, true);
  assert.equal(audio().playbackSource, 'none');
});
