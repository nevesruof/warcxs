import { cached, endpoint, fetchJson, requiredText } from '../lib/http.js';

export default endpoint(
  async (params) => {
    const track = requiredText(params, 'track');
    const artist = requiredText(params, 'artist');
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) return { videoIds: [], available: false, reason: 'youtube-not-configured' };

    return cached(`youtube:${track}:${artist}`, 6 * 60 * 60 * 1000, async () => {
      const query = new URLSearchParams({
        key: apiKey,
        part: 'snippet',
        type: 'video',
        videoEmbeddable: 'true',
        videoSyndicated: 'true',
        maxResults: '5',
        q: `${artist} ${track} official audio`,
      });
      const result = await fetchJson(`https://www.googleapis.com/youtube/v3/search?${query}`);
      const videoIds = (Array.isArray(result.items) ? result.items : [])
        .map((item) => item.id?.videoId)
        .filter(Boolean);
      return { videoIds, videoId: videoIds[0] || null, available: videoIds.length > 0 };
    });
  },
  { maxAge: 3600 },
);
