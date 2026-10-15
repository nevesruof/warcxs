// Manual "mood" line, edited by hand in /data/mood.json. It is independent of
// the live Discord custom status: neither one reads or overwrites the other.
//
//   { "enabled": true, "emoji": "🎧", "text": "locked in", "expiresAt": "2026-12-31T00:00:00Z" }
//
// `expiresAt` is optional; `enabled: false` or empty text hides the pill.

const MAX_TEXT = 80;
const MAX_EMOJI = 8;
const REFRESH_MS = 5 * 60 * 1000;

const clean = (value, max) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

export function parseMood(raw, now = Date.now()) {
  if (!raw || typeof raw !== "object" || raw.enabled === false) return null;
  const text = clean(raw.text, MAX_TEXT);
  if (!text) return null;
  if (raw.expiresAt != null) {
    const expires = Date.parse(raw.expiresAt);
    if (Number.isFinite(expires) && expires <= now) return null;
  }
  return { emoji: clean(raw.emoji, MAX_EMOJI), text };
}

export async function loadMood(fetchImpl = fetch, now = Date.now()) {
  const response = await fetchImpl("/data/mood.json", { cache: "no-cache" });
  if (!response.ok) return null;
  return parseMood(await response.json(), now);
}

// Subscribes `onChange` to the mood; returns an unsubscribe function.
export function watchMood(onChange, fetchImpl = fetch) {
  let stopped = false;
  const refresh = async () => {
    if (document.hidden) return;
    try {
      const mood = await loadMood(fetchImpl);
      if (!stopped) onChange(mood);
    } catch {
      /* keep showing the last known mood */
    }
  };
  void refresh();
  const timer = setInterval(refresh, REFRESH_MS);
  document.addEventListener("visibilitychange", refresh);
  return () => {
    stopped = true;
    clearInterval(timer);
    document.removeEventListener("visibilitychange", refresh);
  };
}
