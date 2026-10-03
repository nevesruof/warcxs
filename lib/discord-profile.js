import { cached, fetchJson } from "./http.js";
import {
  DISCORD_USER_ID,
  profileImageFields,
} from "../src/services/discord-profile.js";

const PUBLIC_PROFILE_URL = `https://avatar-cyan.vercel.app/api/user/${DISCORD_USER_ID}/raw`;

export function readDiscordProfile() {
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  const source = token ? "discord" : "public-profile";
  const refreshAfterMs = token ? 60000 : 300000;
  return cached(`discord-profile:${source}`, refreshAfterMs, async () => {
    const url = token
      ? `https://discord.com/api/v10/users/${DISCORD_USER_ID}`
      : PUBLIC_PROFILE_URL;
    const user = await fetchJson(url, {
      headers: token ? { Authorization: `Bot ${token}` } : {},
      cache: "no-store",
    });
    return {
      user: profileImageFields(user),
      source,
      refreshAfterMs,
    };
  });
}
