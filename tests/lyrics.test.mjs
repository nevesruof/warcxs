import test from "node:test";
import assert from "node:assert/strict";
import { pickBest, findLyrics } from "../api/lyrics.js";

const synced = (duration, id) => ({ id, duration, syncedLyrics: "[00:01.00] hi" });

test("pickBest chooses the synced version with the closest duration", () => {
  const best = pickBest([synced(200, "a"), synced(183, "b"), { duration: 180, plainLyrics: "x" }], 181);
  assert.equal(best.id, "b");
});

test("pickBest rejects versions that would drift", () => {
  assert.equal(pickBest([synced(240, "a")], 180), null);
  assert.equal(pickBest([], 180), null);
});

test("findLyrics falls back to search when the exact match 404s", async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    if (url.includes("/get?")) throw Object.assign(new Error("x"), { status: 404 });
    return [synced(181, "found")];
  };
  const record = await findLyrics({ track: "T", artist: "A", album: "", duration: 180 }, fetchImpl);
  assert.equal(record.id, "found");
  assert.equal(calls.length, 2);
});

test("findLyrics keeps network errors retryable", async () => {
  await assert.rejects(
    findLyrics({ track: "T", artist: "A", album: "", duration: 0 }, async () => {
      throw Object.assign(new Error("boom"), { status: 502 });
    }),
  );
});

test("findLyrics returns null when nothing exists", async () => {
  const fetchImpl = async (url) => {
    if (url.includes("/get?")) throw Object.assign(new Error("x"), { status: 404 });
    return [];
  };
  assert.equal(await findLyrics({ track: "T", artist: "A", album: "", duration: 0 }, fetchImpl), null);
});
