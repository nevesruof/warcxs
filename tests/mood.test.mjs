import test from "node:test";
import assert from "node:assert/strict";
import { parseMood, loadMood } from "../src/services/mood.js";

test("parseMood shows a valid mood and trims it", () => {
  assert.deepEqual(parseMood({ enabled: true, emoji: " 🎧 ", text: "  locked   in " }), {
    emoji: "🎧",
    text: "locked in",
  });
});

test("parseMood hides disabled, empty, expired and malformed moods", () => {
  const now = Date.parse("2026-10-15T00:00:00Z");
  assert.equal(parseMood({ enabled: false, text: "x" }, now), null);
  assert.equal(parseMood({ text: "   " }, now), null);
  assert.equal(parseMood({ text: "x", expiresAt: "2026-10-14T00:00:00Z" }, now), null);
  assert.deepEqual(parseMood({ text: "x", expiresAt: "2026-10-16T00:00:00Z" }, now), { emoji: "", text: "x" });
  assert.equal(parseMood(null), null);
  assert.equal(parseMood("hola"), null);
});

test("parseMood caps the length", () => {
  assert.equal(parseMood({ text: "a".repeat(500) }).text.length, 80);
});

test("loadMood returns null on HTTP errors", async () => {
  assert.equal(await loadMood(async () => ({ ok: false })), null);
  assert.deepEqual(
    await loadMood(async () => ({ ok: true, json: async () => ({ text: "hey" }) })),
    { emoji: "", text: "hey" },
  );
});
