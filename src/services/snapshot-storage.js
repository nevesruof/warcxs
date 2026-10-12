import { storeValue } from "./request.js";
import { DISCORD_USER_ID } from "../config/discord.js";

export const SNAPSHOT_CACHE = `warcxs-site-snapshot:${DISCORD_USER_ID}`;
let latest;
let timer;

function flushSnapshot() {
  clearTimeout(timer);
  timer = null;
  if (!latest) return;
  storeValue(SNAPSHOT_CACHE, latest);
  latest = null;
}

export function saveSnapshot(snapshot, immediate = false) {
  latest = snapshot;
  if (immediate) flushSnapshot();
  else if (!timer) timer = setTimeout(flushSnapshot, 15000);
}

if (typeof window !== "undefined")
  window.addEventListener("pagehide", flushSnapshot);
