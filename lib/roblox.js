import { cached, fetchJson } from './http.js';

export const ROBLOX_USERNAME = 'zahidtql';

async function resolveUser() {
  return cached('roblox:user', 24 * 60 * 60 * 1000, async () => {
    const result = await fetchJson('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [ROBLOX_USERNAME], excludeBannedUsers: false }),
    });
    if (!result.data?.[0]?.id) throw new Error('Roblox user unavailable');
    return result.data[0];
  });
}

export async function gameSummary(universeId) {
  if (!Number.isSafeInteger(universeId) || universeId <= 0) return null;
  return cached(`roblox:game:${universeId}`, 5 * 60 * 1000, async () => {
    const [games, icons] = await Promise.all([
      fetchJson(`https://games.roblox.com/v1/games?universeIds=${universeId}`),
      fetchJson(
        `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=150x150&format=Png&isCircular=false`,
      ).catch(() => null),
    ]);
    const game = games.data?.[0];
    if (!game) return null;
    return {
      universeId,
      placeId: game.rootPlaceId,
      name: game.name,
      creatorName: game.creator?.name || null,
      activePlayers: game.playing,
      description: game.description,
      url: `https://www.roblox.com/games/${game.rootPlaceId}`,
      iconUrl: icons?.data?.find((item) => item.state === 'Completed')?.imageUrl || null,
    };
  });
}

export async function readRoblox(bot) {
  return cached('roblox:presence', 15000, async () => {
    const user = await resolveUser();
    const headers = { 'Content-Type': 'application/json' };
    if (process.env.ROBLOX_COOKIE) headers.Cookie = `.ROBLOSECURITY=${process.env.ROBLOX_COOKIE}`;
    const result = await fetchJson('https://presence.roblox.com/v1/presence/users', {
      method: 'POST',
      headers,
      body: JSON.stringify({ userIds: [user.id] }),
    });
    const presence = result.userPresences?.find((item) => item.userId === user.id);
    const tracked = bot?.roblox?.lastPlayedGame || bot?.recentRobloxGames?.[0];
    const universeId = presence?.universeId || tracked?.universeId;
    const game = await gameSummary(Number(universeId));
    return {
      userId: user.id,
      username: user.name,
      displayName: user.displayName,
      profileUrl: `https://www.roblox.com/users/${user.id}/profile`,
      isPlaying: presence?.userPresenceType === 2,
      lastPlayedGame: game,
      fetchedAt: Date.now(),
    };
  });
}
