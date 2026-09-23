// api/game-activity.js — Vercel serverless function.
// Expone el historial de actividades de Discord (juegos, no Spotify) que
// captura el bot, para la seccion "Recent activity" del sitio.

const BOT_URL = 'http://fi4.bot-hosting.cloud:25319/api/activity';

export default async function handler(req, res) {
  try {
    const headers = {};
    if (process.env.ACTIVITY_BOT_TOKEN) {
      headers.Authorization = `Bearer ${process.env.ACTIVITY_BOT_TOKEN}`;
    }
    const r = await fetch(BOT_URL, { headers, signal: AbortSignal.timeout(5000) });
    if (!r.ok) throw new Error(`bot respondio ${r.status}`);
    const bot = await r.json();

    const items = (bot.recentActivities || []).filter((a) => a.name);
    const activities = items.map((a) => ({
      id: a.sessionId != null ? `discord-outbox:${a.sessionId}` : `discord-outbox:${a.name}-${a.firstSeen}`,
      name: a.kind === 'spotify' ? `${a.name} — ${a.artist}` : a.name,
      startedAt: a.firstSeen ? new Date(a.firstSeen * 1000).toISOString() : undefined,
      lastSeenAt: a.lastSeen ? new Date(a.lastSeen * 1000).toISOString() : undefined,
    }));

    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    res.status(200).json({ activities, source: 'live' });
  } catch (err) {
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    res.status(200).json({ activities: [], source: 'reference' });
  }
}
