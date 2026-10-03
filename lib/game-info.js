import { cached, fetchJson } from './http.js';
import { discordImage } from './game-art.js';
import { gameSummary } from './roblox.js';
import { activityGameKey } from '../src/services/game-info.js';

const DAY = 86400000;
const normalize = (name) =>
  String(name || '')
    .normalize('NFKD')
    .replace(/[™®]/g, '')
    .replace(/^Tom Clancy['’]s\s+/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const plainText = (text) =>
  String(text || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(
      /&(?:amp|quot|apos|lt|gt|nbsp);/g,
      (entity) =>
        ({
          '&amp;': '&',
          '&quot;': '"',
          '&apos;': "'",
          '&lt;': '<',
          '&gt;': '>',
          '&nbsp;': ' ',
        })[entity],
    )
    .replace(/\s+/g, ' ')
    .trim();

function website(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol)
      ? { url: url.href, hostname: url.hostname }
      : null;
  } catch {
    return null;
  }
}

export function selectSteamGame(items, name) {
  return items?.find((item) => item.type === 'app' && normalize(item.name) === normalize(name));
}

export function steamDetails(game, id, icon) {
  if (game?.type !== 'game') return null;
  return {
    id,
    name: game.name,
    source: 'steam',
    iconUrl: icon || game.header_image,
    coverUrl: game.header_image,
    bannerUrl: game.background_raw || game.background || game.header_image,
    summary: plainText(game.short_description || game.about_the_game),
    screenshots: (game.screenshots || []).slice(0, 6).map((image) => image.path_full),
    genres: (game.genres || []).map((genre) => genre.description),
    gameModes: (game.categories || [])
      .filter((category) => [1, 2, 9, 27, 36, 38, 39].includes(category.id))
      .map((category) => category.description),
    platforms: Object.entries(game.platforms || {})
      .filter(([, supported]) => supported)
      .map(([name]) => ({
        name: { windows: 'Windows', mac: 'macOS', linux: 'Linux' }[name] || name,
      })),
    developers: game.developers || [],
    publishers: game.publishers || [],
    releaseDate:
      !game.release_date?.coming_soon && Number.isFinite(Date.parse(game.release_date?.date))
        ? new Date(game.release_date.date).toISOString()
        : null,
    totalRating: Number.isFinite(game.metacritic?.score) ? game.metacritic.score : null,
    websites: [
      website(game.website),
      website(`https://store.steampowered.com/app/${game.steam_appid}/`),
    ].filter(Boolean),
  };
}

async function steamGame(name, app, id, icon) {
  const sku = app?.third_party_skus?.find(
    (entry) => entry.distributor === 'steam' && /^\d+$/.test(entry.sku),
  );
  let steamId = sku?.sku;
  if (!steamId) {
    const search = await fetchJson(
      `https://store.steampowered.com/api/storesearch/?${new URLSearchParams({ term: name, l: 'english', cc: 'us' })}`,
    );
    steamId = selectSteamGame(search.items, name)?.id;
  }
  if (!steamId) return null;
  const result = await fetchJson(
    `https://store.steampowered.com/api/appdetails?appids=${steamId}&l=english&cc=us`,
  );
  return result[steamId]?.success ? steamDetails(result[steamId].data, id, icon) : null;
}

async function robloxDetails(activity, bot, id) {
  const games = [
    bot.roblox?.currentGame,
    bot.roblox?.lastPlayed,
    bot.roblox?.lastPlayedGame,
    ...(bot.recentRobloxGames || []),
  ].filter(Boolean);
  // A past session must never inherit the metadata of an unrelated Roblox experience.
  const match = games.find((game) => normalize(game.name) === normalize(activity.details));
  if (!match?.universeId) return null;
  const game = await gameSummary(Number(match.universeId));
  if (!game) return null;
  const thumbnails = await fetchJson(
    `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${game.universeId}&countPerUniverse=6&defaults=true&size=768x432&format=Png&isCircular=false`,
  ).catch(() => null);
  const screenshots = (thumbnails?.data?.[0]?.thumbnails || [])
    .filter((image) => image.state === 'Completed')
    .map((image) => image.imageUrl);
  return {
    id,
    name: game.name,
    source: 'roblox',
    summary: game.description,
    iconUrl: game.iconUrl,
    coverUrl: game.iconUrl,
    bannerUrl: screenshots[0] || game.iconUrl,
    screenshots,
    developers: game.creatorName ? [game.creatorName] : [],
    websites: [website(game.url)].filter(Boolean),
  };
}

async function resolveGame(activity, bot, lookupIgdb) {
  const id = activityGameKey(activity);
  const applicationId = String(activity.applicationId || activity.application_id || '');
  if (normalize(activity.name) === 'roblox') {
    const experience = await robloxDetails(activity, bot, id).catch(() => null);
    if (experience) return experience;
  }
  return cached(`game-info:${id}:${normalize(activity.name)}`, DAY, async () => {
    const igdb = await lookupIgdb?.(id).catch(() => null);
    if (igdb) return igdb;
    const app = /^\d+$/.test(applicationId)
      ? await fetchJson(`https://discord.com/api/v10/applications/${applicationId}/rpc`).catch(() => null)
      : null;
    const icon = app?.icon
      ? `https://cdn.discordapp.com/app-icons/${applicationId}/${app.icon}.png?size=256`
      : discordImage(activity.image, applicationId);
    const steam = await steamGame(activity.name, app, id, icon).catch(() => null);
    if (steam) return steam;
    return {
      id,
      name: activity.name,
      source: app?.description ? 'discord' : 'placeholder',
      summary: plainText(app?.description),
      iconUrl: icon,
      coverUrl: icon,
      websites: [],
    };
  });
}

export async function readGameInfo(bot, ids, lookupIgdb) {
  const activities = new Map();
  for (const activity of [...(bot.discord?.activities || []), ...(bot.recentActivities || [])]) {
    if (!activity.name || (activity.kind !== 'playing' && activity.type !== 0)) continue;
    const id = activityGameKey(activity);
    if (!activities.has(id)) activities.set(id, activity);
  }
  return (
    await Promise.all(
      ids.map((id) =>
        activities.has(id) ? resolveGame(activities.get(id), bot, lookupIgdb).catch(() => null) : null,
      ),
    )
  ).filter(Boolean);
}
