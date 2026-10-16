import test from "node:test";
import assert from "node:assert/strict";
import { createActivityHistory } from "../src/services/activity-history.js";
import { DISCORD_USER_ID } from "../src/config/discord.js";

test("a saved copy never shows sessions that were still live when it was saved", () => {
  const saved = {
    userId: DISCORD_USER_ID,
    recentActivities: [
      { id: "a", name: "Old game", lastSeenAt: 1, active: false },
      { id: "b", name: "Was live", details: "Editing Tab #1", lastSeenAt: 2, active: true },
    ],
    activities: [{ id: "b", name: "Was live" }],
    recentSongs: [],
  };
  const history = createActivityHistory(null, { getItem: () => JSON.stringify(saved), setItem() {} }, () => {});
  assert.deepEqual(history.current().recentActivities.map((a) => a.id), ["a"]);
  assert.deepEqual(history.current().activities, []);
});
