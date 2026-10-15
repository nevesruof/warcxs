import { cached, endpoint, rateLimit, requiredText } from '../lib/http.js';
import { findVideos } from '../lib/youtube.js';

const FOUND = 'public, s-maxage=86400, stale-while-revalidate=604800';
const MISSED = 'public, s-maxage=30';

export default endpoint(async (params, req, res) => {
  const track = requiredText(params, 'track');
  const artist = requiredText(params, 'artist');
  const key = `youtube:${track.toLowerCase()}:${artist.toLowerCase()}`;
  // Found songs are kept for a day; misses only briefly, so a quota reset or a
  // fixed key is picked up quickly instead of being cached as "unavailable".
  const result = await cached(
    key,
    (value) => (value.available ? 24 * 3600 * 1000 : 60 * 1000),
    () => {
      // Each distinct lookup can spend YouTube quota; cache hits are free.
      rateLimit(req, 'playback', 30);
      return findVideos({ track, artist });
    },
  );
  res?.setHeader('Cache-Control', result.available ? FOUND : MISSED);
  if (result.reason) console.warn(`[playback] no match (${result.reason}) for "${artist} - ${track}"`);
  else if (result.apiReason) console.warn(`[playback] YouTube API unavailable (${result.apiReason}); used ${result.source}`);
  return result;
});
