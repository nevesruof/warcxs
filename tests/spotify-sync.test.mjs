import test from "node:test";
import assert from "node:assert/strict";
import {
  createSpotifySync,
  liveSpotifyTrack,
} from "../src/services/spotify-sync.js";

function fixture() {
  let time = 100000;
  let timerId = 0;
  const timers = new Map();
  const calls = [];
  const positions = [];
  const audio = { entered: true, volume: 30, playbackSource: "none" };
  let result = true;
  const sync = createSpotifySync({
    now: () => time,
    hidden: () => false,
    readAudio: () => audio,
    schedule: (callback, delay) => {
      const id = ++timerId;
      timers.set(id, { callback, at: time + delay });
      return id;
    },
    cancel: (id) => timers.delete(id),
    play: async (track) => {
      calls.push({ track: track.track, offset: (time - track.start) / 1000 });
      const started = await (typeof result === "function" ? result() : result);
      if (started) {
        audio.playbackSource = "spotify";
        audio.isAudioPlaying = true;
      }
      return started;
    },
    stop: () => {
      audio.playbackSource = "none";
      audio.isAudioPlaying = false;
    },
    syncTime: (position) => positions.push(position),
  });
  const flush = async () => {
    for (let i = 0; i < 8; i++) await Promise.resolve();
  };
  return {
    sync,
    audio,
    calls,
    positions,
    timers,
    flush,
    result: (next) => {
      result = next;
    },
    presence: (song = "Live song", start = 80000, end = 300000) => ({
      listening_to_spotify: true,
      spotify: {
        track_id: song,
        song,
        artist: "Artist",
        timestamps: { start, end },
      },
    }),
    advance: async (elapsed) => {
      const target = time + elapsed;
      while (true) {
        const next = [...timers]
          .filter(([, timer]) => timer.at <= target)
          .sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        timers.delete(next[0]);
        time = next[1].at;
        next[1].callback();
        await flush();
      }
      time = target;
      await flush();
    },
  };
}

test("Spotify received before entry starts at its current second, and unchanged polls do not restart it", async () => {
  const f = fixture();
  f.audio.entered = false;
  f.sync.update(f.presence());
  assert.equal(f.calls.length, 0);
  f.audio.entered = true;
  f.sync.retry();
  await f.flush();
  assert.equal(f.calls[0].offset, 20);
  f.sync.update(f.presence());
  await f.advance(5000);
  assert.equal(f.calls.length, 1);
  assert.equal(f.positions.at(-1), 25);
});

test("An initial YouTube failure recovers without a UI render and retries use the live position", async () => {
  const f = fixture();
  f.result(false);
  f.sync.update(f.presence());
  await f.flush();
  assert.equal(f.calls.length, 1);
  f.sync.update(f.presence());
  await f.advance(2999);
  assert.equal(f.calls.length, 1);
  f.result(true);
  await f.advance(1);
  assert.equal(f.calls.length, 2);
  assert.equal(f.calls[1].offset, 23);
  assert.equal(f.audio.playbackSource, "spotify");
});

test("Repeated failures back off and stop retrying when the live track expires", async () => {
  const f = fixture();
  f.result(false);
  f.sync.update(f.presence("Unavailable song", 80000, 125000));
  await f.flush();
  await f.advance(24999);
  assert.equal(f.calls.length, 3);
  await f.advance(10000);
  assert.equal(f.calls.length, 3);
  assert.equal(f.timers.size, 0);
});

test("New songs and Spotify seeks replace the live request while manual playback keeps priority", async () => {
  const f = fixture();
  f.sync.update(f.presence());
  await f.flush();
  f.sync.update(f.presence("Next song", 95000));
  await f.flush();
  assert.equal(f.calls.at(-1).track, "Next song");
  assert.equal(f.calls.at(-1).offset, 5);
  f.sync.update(f.presence("Next song", 99000));
  await f.flush();
  assert.equal(f.calls.at(-1).offset, 1);
  f.audio.playbackSource = "manual";
  f.sync.update(f.presence("Third song", 99000));
  await f.flush();
  assert.equal(f.calls.length, 3);
  await f.advance(5000);
  f.audio.playbackSource = "none";
  f.sync.retry();
  await f.flush();
  assert.equal(f.calls.at(-1).track, "Third song");
  assert.equal(f.calls.at(-1).offset, 6);
});

test("Stopping Spotify removes retry timers; silent entry and mute never start live audio", async () => {
  const f = fixture();
  f.audio.isAudioDisabled = true;
  f.sync.update(f.presence());
  await f.flush();
  assert.equal(f.calls.length, 0);
  f.audio.isAudioDisabled = false;
  f.audio.volume = 0;
  f.sync.tick();
  await f.flush();
  assert.equal(f.calls.length, 0);
  f.audio.volume = 30;
  f.sync.tick();
  await f.flush();
  assert.equal(f.calls.length, 1);
  f.sync.update({ listening_to_spotify: false });
  assert.equal(f.audio.playbackSource, "none");
  assert.equal(f.timers.size, 0);
  assert.equal(f.sync.position(), null);
  assert.equal(
    liveSpotifyTrack({
      listening_to_spotify: true,
      spotify: { song: "Malformed", artist: "Artist" },
    }),
    null,
  );
});
