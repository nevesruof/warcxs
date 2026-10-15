import { cached, endpoint, fetchJson, rateLimit, requiredText } from '../lib/http.js';

export function normalizeLyrics(record, track, artist) {
  return {
    provider: 'lrclib',
    status: record?.syncedLyrics ? 'lineSynced' : record?.plainLyrics ? 'plain' : 'none',
    trackName: record?.trackName || track,
    artistName: record?.artistName || artist,
    albumName: record?.albumName || null,
    duration: record?.duration ? Math.round(record.duration * 1000) : null,
    instrumental: Boolean(record?.instrumental),
    lineSyncedLyrics: record?.syncedLyrics || null,
    plainLyrics: record?.plainLyrics || null,
    wordSyncedLyrics: null,
    fetchedAt: Date.now(),
  };
}

const LRCLIB = 'https://lrclib.net/api';
const MAX_DURATION_GAP_S = 6; // a synced version this far off would drift visibly

// LRCLIB's exact match needs the duration within ~2s, and Spotify's duration
// often differs from the uploaded version. Search results are scored instead:
// synced lyrics only, closest duration first.
export function pickBest(results, durationS) {
  const synced = (Array.isArray(results) ? results : []).filter(
    (item) => item?.syncedLyrics && !item.instrumental,
  );
  if (!synced.length) return null;
  if (!(durationS > 0)) return synced[0];
  const gap = (item) => Math.abs((Number(item.duration) || Infinity) - durationS);
  const best = synced.reduce((a, b) => (gap(b) < gap(a) ? b : a));
  return gap(best) <= MAX_DURATION_GAP_S ? best : null;
}

const missing = (error) => {
  if (error?.status === 404) return null;
  throw error; // network failures must stay retryable
};

export async function findLyrics({ track, artist, album, duration }, fetchImpl = fetchJson) {
  const exact = new URLSearchParams({ track_name: track, artist_name: artist });
  if (album) exact.set('album_name', album);
  if (duration > 0) exact.set('duration', String(duration));
  const record = await fetchImpl(`${LRCLIB}/get?${exact}`).catch(missing);
  if (record?.syncedLyrics || record?.instrumental) return record;
  const search = new URLSearchParams({ track_name: track, artist_name: artist });
  const results = await fetchImpl(`${LRCLIB}/search?${search}`).catch(missing);
  return pickBest(results, duration) || record || null;
}

export default endpoint(
  async (params, req) => {
    const track = requiredText(params, 'track');
    const artist = requiredText(params, 'artist');
    const duration = Number(params.get('duration'));
    const album = params.get('album')?.slice(0, 240) || '';
    const lookup = {
      track,
      artist,
      album,
      duration: duration > 0 && duration < 86400 ? duration : 0,
    };
    // A retry from the page (nocache) must not be answered with a stored miss.
    const key = `lyrics:${JSON.stringify(lookup)}${params.get('nocache') ? `:${params.get('_t')}` : ''}`;
    return cached(
      key,
      // Hits last an hour; misses only seconds so a late upload shows up soon.
      (value) => (value.status === 'none' ? 20 * 1000 : 60 * 60 * 1000),
      async () => {
        rateLimit(req, 'lyrics', 30); // only unique lookups reach LRCLIB
        return normalizeLyrics(await findLyrics(lookup), track, artist);
      },
    );
  },
  { maxAge: 600 },
);
