// Resolves rich IGDB game details ("OPEN DETAILS") for Discord activities.
// The frontend only knows a Discord application id, so this bridges it in two hops:
// Discord's public RPC endpoint gives the game's name, then IGDB is searched by that name.
import { cached, fetchJson, endpoint } from '../lib/http.js';
import { readBot } from '../lib/activity.js';
import { readGameInfo } from '../lib/game-info.js';

// IGDB v4 website category enum (only the ones the profile card links out to).
const CATEGORY_HOST = {
  1: 'official',
  3: 'wikipedia',
  4: 'twitter',
  5: 'facebook',
  6: 'twitch',
  8: 'instagram',
  9: 'youtube',
  13: 'steam',
  14: 'reddit',
  15: 'itch',
  16: 'epicgames',
  17: 'gog',
  18: 'discord',
};

function image(imageId, size) {
  return imageId ? `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg` : null;
}

function mapWebsites(list) {
  return (list || [])
    .map((site) => ({
      url: site.url,
      hostname: CATEGORY_HOST[site.category] || null,
      category: site.category ?? null,
    }))
    .filter((site) => site.hostname);
}

async function igdbAuth() {
  return cached('igdb:token', 55 * 24 * 3600 * 1000, async () => {
    const clientId = process.env.IGDB_CLIENT_ID?.trim();
    const clientSecret = process.env.IGDB_CLIENT_SECRET?.trim();
    if (!clientId || !clientSecret) throw new Error('IGDB credentials are not configured');
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    });
    const data = await fetchJson(`https://id.twitch.tv/oauth2/token?${params}`, { method: 'POST' });
    return { token: data.access_token, clientId };
  });
}

async function discordAppName(applicationId) {
  return cached(`discord:app-name:${applicationId}`, 24 * 3600 * 1000, async () => {
    const app = await fetchJson(`https://discord.com/api/v10/applications/${applicationId}/rpc`);
    return typeof app.name === 'string' && app.name.trim() ? app.name.trim() : null;
  }).catch(() => null);
}

async function searchIgdb(name) {
  const { token, clientId } = await igdbAuth();
  const query = `search "${name.replace(/"/g, '\\"')}";
    fields name,slug,summary,storyline,first_release_date,rating,aggregated_rating,total_rating,
      genres.name,themes.name,game_modes.name,player_perspectives.name,
      platforms.name,platforms.abbreviation,
      involved_companies.company.name,involved_companies.developer,involved_companies.publisher,
      websites.url,websites.category,screenshots.image_id,cover.image_id;
    limit 1;`;
  const [game] = await fetchJson('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': clientId,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'text/plain',
    },
    body: query,
  });
  return game || null;
}

function toGameInfo(applicationId, game) {
  const developers = [];
  const publishers = [];
  for (const link of game.involved_companies || []) {
    const name = link.company?.name;
    if (!name) continue;
    if (link.developer) developers.push(name);
    if (link.publisher) publishers.push(name);
  }
  return {
    id: String(applicationId),
    igdbId: game.id,
    slug: game.slug || null,
    name: game.name,
    coverUrl: image(game.cover?.image_id, 'cover_big'),
    bannerUrl: image(game.screenshots?.[0]?.image_id, '1080p'),
    summary: game.summary || null,
    storyline: game.storyline || null,
    genres: (game.genres || []).map((g) => g.name).filter(Boolean),
    themes: (game.themes || []).map((t) => t.name).filter(Boolean),
    gameModes: (game.game_modes || []).map((m) => m.name).filter(Boolean),
    playerPerspectives: (game.player_perspectives || []).map((p) => p.name).filter(Boolean),
    platforms: (game.platforms || [])
      .map((p) => ({ name: p.name, abbreviation: p.abbreviation || null }))
      .filter((p) => p.name),
    developers,
    publishers,
    websites: mapWebsites(game.websites),
    screenshots: (game.screenshots || []).map((s) => image(s.image_id, '1080p')).filter(Boolean),
    releaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000).toISOString().slice(0, 10)
      : null,
    releaseTimestamp: game.first_release_date ? game.first_release_date * 1000 : null,
    rating: typeof game.rating === 'number' ? game.rating : null,
    aggregatedRating: typeof game.aggregated_rating === 'number' ? game.aggregated_rating : null,
    totalRating: typeof game.total_rating === 'number' ? game.total_rating : null,
    source: 'igdb',
  };
}

export async function lookupGame(applicationId) {
  return cached(`igdb:game:${applicationId}`, 6 * 3600 * 1000, async () => {
    if (!/^\d{5,25}$/.test(applicationId)) return null;
    const name = await discordAppName(applicationId);
    if (!name) return null;
    const game = await searchIgdb(name);
    return game ? toGameInfo(applicationId, game) : null;
  });
}

export default endpoint(async (params) => {
  const ids = [...new Set((params.get('ids') || '').split(',').map((id) => id.trim()).filter(Boolean))];
  if (!ids.length) return [];
  if (ids.length > 25 || ids.some((id) => id.length > 160)) {
    const error = new Error('Invalid game IDs');
    error.status = 400;
    throw error;
  }
  const lookupIgdb = process.env.IGDB_CLIENT_ID && process.env.IGDB_CLIENT_SECRET ? lookupGame : undefined;
  return readGameInfo(await readBot(), ids, lookupIgdb);
});
