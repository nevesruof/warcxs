import test from "node:test";
import assert from "node:assert/strict";

const storage = new Map();
let calls = 0;
let fail = false;
let delay = 0;
let active = 0;
let peak = 0;
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
};
globalThis.fetch = async () => {
  calls++;
  if (fail) throw Error("Network unavailable");
  active++;
  peak = Math.max(peak, active);
  if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
  active--;
  return Response.json({
    videoIds: ["aaaaaaaaaaa", "aaaaaaaaaaa", "invalid", "bbbbbbbbbbb"],
  });
};
const { resolveTrack, parseVideoId, getCachedTrack, prefetchTracks } =
  await import("../src/services/playback-cache.js");

test("lookup deduplicates concurrent requests, normalizes keys, and persists valid matches", async () => {
  const results = await Promise.all([
    resolveTrack("  Song  ", "Artist"),
    resolveTrack("song", "artist"),
  ]);
  assert.equal(calls, 1);
  assert.deepEqual(results[0].videoIds, ["aaaaaaaaaaa", "bbbbbbbbbbb"]);
  await resolveTrack("SONG", "ARTIST");
  assert.equal(calls, 1);
  assert.equal(getCachedTrack("song", "Artist").videoId, "aaaaaaaaaaa");
  const restored = await import("../src/services/playback-cache.js?reload");
  await restored.resolveTrack("Song", "Artist");
  assert.equal(calls, 1);
});

test("playlist preparation limits background concurrency and removes lookups from later clicks", async () => {
  delay = 15;
  peak = 0;
  const songs = Array.from({ length: 6 }, (_, index) => ({
    trackName: `Playlist Song ${index}`,
    artistName: "Artist",
  }));
  const before = calls;
  await prefetchTracks(songs);
  assert.equal(calls - before, songs.length);
  assert.equal(peak, 2);
  await Promise.all(
    songs.map((song) => resolveTrack(song.trackName, song.artistName)),
  );
  assert.equal(calls - before, songs.length);
  delay = 0;
});

test("failed lookups stay retryable and invalid video links are rejected", async () => {
  fail = true;
  await assert.rejects(resolveTrack("Retry Song", "Artist"));
  fail = false;
  assert.equal((await resolveTrack("Retry Song", "Artist")).available, true);
  assert.equal(
    parseVideoId("https://notyoutube.com/watch?v=aaaaaaaaaaa"),
    null,
  );
  assert.equal(
    parseVideoId("https://youtu.be/aaaaaaaaaaa?t=20"),
    "aaaaaaaaaaa",
  );
  assert.equal(
    parseVideoId("https://www.youtube.com/shorts/bbbbbbbbbbb"),
    "bbbbbbbbbbb",
  );
});

test("a newer playlist reuses background workers instead of multiplying requests", async () => {
  delay = 15;
  peak = 0;
  const previous = Array.from({ length: 4 }, (_, index) => ({
    trackName: `Previous ${index}`,
    artistName: "Artist",
  }));
  const current = Array.from({ length: 4 }, (_, index) => ({
    trackName: `Current ${index}`,
    artistName: "Artist",
  }));
  await Promise.all([prefetchTracks(previous), prefetchTracks(current)]);
  assert.equal(peak, 2);
  assert.equal(getCachedTrack(previous[3].trackName, "Artist"), null);
  assert.ok(
    current.every(
      (song) => getCachedTrack(song.trackName, song.artistName)?.available,
    ),
  );
  delay = 0;
});
