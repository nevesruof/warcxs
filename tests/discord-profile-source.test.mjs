import test from "node:test";
import assert from "node:assert/strict";

const id = "893966003690668102";
const hash = "a".repeat(32);

test("without a bot token the profile comes from the activity bot before the public mirror", async (t) => {
  delete process.env.DISCORD_BOT_TOKEN;
  process.env.ACTIVITY_BOT_URL = "https://bot.example/api/activity";
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return Response.json({
      discordUserId: id,
      discord: { activities: [], status: "online" },
      recentActivities: [],
      profile: { id, username: "warcxss", global_name: "Take", avatar: hash, banner: null, accent_color: null, discriminator: "0" },
    });
  };
  t.after(() => (globalThis.fetch = original));
  const { readDiscordProfile } = await import("../lib/discord-profile.js");
  const result = await readDiscordProfile();
  assert.equal(result.source, "bot");
  assert.equal(result.user.avatar, hash);
  assert.equal(result.user.display_name, "Take");
  assert.ok(!calls.some((url) => url.includes("avatar-cyan")));
});
