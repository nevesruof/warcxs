import { cached, endpoint, fetchJson, requiredText } from '../lib/http.js';

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

export default endpoint(
  async (params) => {
    const track = requiredText(params, 'track');
    const artist = requiredText(params, 'artist');
    const duration = Number(params.get('duration'));
    const query = new URLSearchParams({ track_name: track, artist_name: artist });
    if (params.get('album')) query.set('album_name', params.get('album').slice(0, 240));
    if (duration > 0 && duration < 86400) query.set('duration', String(duration));

    return cached(`lyrics:${query}`, 60 * 60 * 1000, async () => {
      let record;
      try {
        record = await fetchJson(`https://lrclib.net/api/get?${query}`);
      } catch (error) {
        if (error.status !== 404) throw error;
        // A missing match is valid; network failures must remain retryable.
        record = null;
      }
      return normalizeLyrics(record, track, artist);
    });
  },
  { maxAge: 3600 },
);
