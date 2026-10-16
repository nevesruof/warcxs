import { cached, fetchJson } from "./http.js";
import { readBot } from "./activity.js";
import {
  DISCORD_USER_ID,
  profileImageFields,
} from "../src/services/discord-profile.js";

const PUBLIC_PROFILE_URL = `https://avatar-cyan.vercel.app/api/user/${DISCORD_USER_ID}/raw`;

async function loadUser(token) {
  // 1. Discord itself, when a bot token is configured on the host.
  if (token)
    return {
      source: "discord",
      user: await fetchJson(`https://discord.com/api/v10/users/${DISCORD_USER_ID}`, {
        headers: { Authorization: `Bot ${token}` },
        cache: "no-store",
      }),
    };
  // 2. The activity bot, which is already logged in and refreshes it every few minutes.
  try {
    const profile = (await readBot()).profile;
    if (profile?.id === DISCORD_USER_ID) return { source: "bot", user: profile };
  } catch {
    /* fall through to the public provider */
  }
  // 3. Third-party mirror; its own cache can hold changes back for hours.
  return {
    source: "public-profile",
    user: await fetchJson(PUBLIC_PROFILE_URL, { cache: "no-store" }),
  };
}

export function readDiscordProfile() {
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  const refreshAfterMs = token ? 60000 : 120000;
  return cached(`discord-profile:${token ? "discord" : "auto"}`, refreshAfterMs, async () => {
    const { source, user } = await loadUser(token);
    return { user: profileImageFields(user), source, refreshAfterMs };
  });
}
