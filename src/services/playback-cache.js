import { readStored, requestJson, storeValue } from "./request.js";

const CACHE_KEY = "site-playback-matches-v2";
const CACHE_TTL = 6 * 60 * 60 * 1000;
const MAX_MATCHES = 40;
const matches = new Map();
const requests = new Map();
const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "www.youtube-nocookie.com",
]);

export function parseVideoId(value) {
  if (typeof value !== "string") return null;
  value = value.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    let id;
    if (url.hostname === "youtu.be") id = url.pathname.split("/")[1];
    else if (YOUTUBE_HOSTS.has(url.hostname))
      id =
        url.searchParams.get("v") ||
        url.pathname.match(/^\/(?:embed|shorts)\/([\w-]{11})\/?$/)?.[1];
    return /^[\w-]{11}$/.test(id || "") ? id : null;
  } catch {
    return null;
  }
}

function videoIds(result) {
  return [
    ...new Set(
      [
        result?.videoId,
        ...(Array.isArray(result?.videoIds) ? result.videoIds : []),
      ]
        .map(parseVideoId)
        .filter(Boolean),
    ),
  ];
}

const saved = readStored(CACHE_KEY, {});
for (const [key, match] of Object.entries(saved || {}).slice(-MAX_MATCHES)) {
  if (match?.expires > Date.now() && videoIds(match).length)
    matches.set(key, match);
}

export function resolveTrack(track, artist) {
  track = String(track || "").trim();
  artist = String(artist || "").trim();
  if (!track) return Promise.resolve({ videoIds: [], available: false });
  const key = JSON.stringify([track.toLowerCase(), artist.toLowerCase()]);
  const cached = matches.get(key);
  if (cached?.expires > Date.now()) return Promise.resolve(cached);
  if (requests.has(key)) return requests.get(key);
  const query = new URLSearchParams({ track, artist });
  const request = requestJson(`/api/playback?${query}`)
    .then((result) => {
      const ids = videoIds(result);
      const match = {
        videoIds: ids,
        videoId: ids[0] || null,
        available: ids.length > 0,
        expires: Date.now() + (ids.length ? CACHE_TTL : 60000),
      };
      if (matches.size >= MAX_MATCHES)
        matches.delete(matches.keys().next().value);
      matches.set(key, match);
      storeValue(
        CACHE_KEY,
        Object.fromEntries([...matches].filter(([, value]) => value.available)),
      );
      return match;
    })
    .finally(() => requests.delete(key));
  requests.set(key, request);
  return request;
}
