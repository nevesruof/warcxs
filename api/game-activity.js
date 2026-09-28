import { readBot, historyPayload } from '../lib/activity.js';
import { activityArt } from '../lib/game-art.js';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method && req.method !== 'GET') return res.status(405).json({ error: 'GET only' });
  try {
    const payload = historyPayload(await readBot());
    for (let offset = 0; offset < Math.min(20, payload.recentActivities.length); offset += 5) {
      const enriched = await Promise.all(
        payload.recentActivities.slice(offset, offset + 5).map(activityArt),
      );
      payload.recentActivities.splice(offset, enriched.length, ...enriched);
    }
    const images = new Map(payload.recentActivities.map((item) => [item.id, item.largeImage]));
    payload.activities = payload.activities.map((item) => ({
      ...item,
      largeImage: images.get(item.id) || item.largeImage,
    }));
    return res.status(200).json(payload);
  } catch {
    return res.status(503).json({ error: 'Activity history temporarily unavailable' });
  }
}
