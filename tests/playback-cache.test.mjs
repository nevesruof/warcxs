import test from "node:test";
import assert from "node:assert/strict";

const storage = new Map();
let calls = 0;
let fail = false;
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
};
globalThis.fetch = async () => {
  calls++;
  if (fail) throw Error("Network unavailable");
  return Response.json({
    videoIds: ["aaaaaaaaaaa", "aaaaaaaaaaa", "invalid", "bbbbbbbbbbb"],
  });
};
const { resolveTrack, parseVideoId } =
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
  const restored = await import("../src/services/playback-cache.js?reload");
  await restored.resolveTrack("Song", "Artist");
  assert.equal(calls, 1);
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
