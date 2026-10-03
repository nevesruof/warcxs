import test from 'node:test';
import assert from 'node:assert/strict';
import { readGameInfo, selectSteamGame, steamDetails } from '../lib/game-info.js';
import { activityGameKey, hasGameDetails } from '../src/services/game-info.js';

test('Steam matching rejects DLCs and similarly named sequels', () => {
  const game = { type: 'app', name: "Tom Clancy's Rainbow Six® Siege", id: 359550 };
  assert.equal(
    selectSteamGame(
      [{ type: 'app', name: 'Rainbow Six Siege Credits', id: 1 }, game],
      'Rainbow Six Siege',
    ),
    game,
  );
  assert.equal(selectSteamGame([{ type: 'app', name: 'Portal 2', id: 620 }], 'Portal'), undefined);
});

test('Roblox experience keys match live and recent activities and distinguish different games', () => {
  const live = { name: 'Roblox', application_id: '123456', details: 'Soccer' };
  const recent = { name: 'ROBLOX', applicationId: '123456', details: 'soccer' };
  assert.equal(activityGameKey(live), activityGameKey(recent));
  assert.notEqual(activityGameKey(live), activityGameKey({ ...recent, details: 'Another Game' }));
});

test('Configured IGDB metadata takes precedence and failed lookup retains other providers', async (t) => {
  t.mock.method(globalThis, 'fetch', async (input) => {
    const url = new URL(input);
    if (url.hostname === 'discord.com') return Response.json({ description: 'Discord description.' });
    if (url.pathname.endsWith('/storesearch/')) return Response.json({ items: [] });
    throw Error('Unexpected request');
  });
  const activity = { kind: 'playing', name: 'IGDB Game', applicationId: '987654321012345680' };
  const bot = { discord: { activities: [activity] }, recentActivities: [] };
  const lookup = async (id) => ({ id, name: activity.name, source: 'igdb', summary: 'IGDB description.' });
  const [game] = await readGameInfo(bot, [activityGameKey(activity)], lookup);
  assert.equal(game.source, 'igdb');
  activity.applicationId = '987654321012345681';
  const [fallback] = await readGameInfo(bot, [activityGameKey(activity)], async () => { throw Error('IGDB down'); });
  assert.equal(fallback.source, 'discord');
  assert.equal(fallback.summary, 'Discord description.');
});

test('Game metadata includes only provider facts and safe links', () => {
  const result = steamDetails(
    {
      type: 'game',
      name: 'Example',
      steam_appid: 7,
      short_description: '<b>A game</b> &amp; an adventure.',
      header_image: 'https://example.com/cover.jpg',
      screenshots: [{ path_full: 'https://example.com/screen.jpg' }],
      platforms: { windows: true, mac: false },
      genres: [{ description: 'Action' }],
      developers: ['Studio'],
      website: 'javascript:alert(1)',
      release_date: { coming_soon: true, date: 'Soon' },
    },
    'discord-id',
  );
  assert.equal(result.summary, 'A game & an adventure.');
  assert.deepEqual(result.platforms, [{ name: 'Windows' }]);
  assert.equal(result.releaseDate, null);
  assert.equal(result.totalRating, null);
  assert.equal(result.websites.length, 1);
  assert.ok(hasGameDetails(result));
  assert.equal(hasGameDetails({ iconUrl: 'image.png' }), false);
  assert.equal(steamDetails({ type: 'dlc' }, 'id'), null);
});

test('New bot games resolve automatically, cache requests and preserve partial results', async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (input) => {
    const url = new URL(input);
    calls.push(url.href);
    if (url.hostname === 'discord.com')
      return Response.json({ description: 'An exploration game.' });
    if (url.pathname.endsWith('/storesearch/')) return Response.json({ items: [] });
    throw Error('Unexpected request');
  };
  const activity = {
    kind: 'playing',
    name: 'A Newly Played Game',
    applicationId: '987654321012345678',
  };
  const bot = { discord: { activities: [activity] }, recentActivities: [] };
  try {
    const [first, second] = await Promise.all([
      readGameInfo(bot, [activityGameKey(activity), 'unknown']),
      readGameInfo(bot, [activityGameKey(activity)]),
    ]);
    assert.equal(first.length, 1);
    assert.deepEqual(first, second);
    assert.equal(first[0].source, 'discord');
    assert.ok(hasGameDetails(first[0]));
    assert.equal(calls.length, 2);
    await readGameInfo(bot, [activityGameKey(activity)]);
    assert.equal(calls.length, 2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('Roblox details use the matched experience, never a different last-played game', async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (input) => {
    const url = new URL(input);
    calls.push(url.href);
    if (url.hostname === 'games.roblox.com')
      return Response.json({
        data: [
          {
            id: 9876,
            rootPlaceId: 88,
            name: 'Soccer',
            description: 'Play soccer.',
            creator: { name: 'Creator' },
          },
        ],
      });
    if (url.pathname.includes('/icons'))
      return Response.json({
        data: [{ state: 'Completed', imageUrl: 'https://example.com/icon.png' }],
      });
    if (url.pathname.includes('/thumbnails'))
      return Response.json({
        data: [
          { thumbnails: [{ state: 'Completed', imageUrl: 'https://example.com/screen.png' }] },
        ],
      });
    if (url.hostname === 'discord.com') return Response.json({ description: 'Roblox platform.' });
    if (url.pathname.endsWith('/storesearch/')) return Response.json({ items: [] });
    throw Error('Unexpected request');
  };
  const activity = {
    kind: 'playing',
    name: 'Roblox',
    details: 'Soccer',
    applicationId: '987654321012345679',
  };
  const bot = {
    discord: { activities: [activity] },
    recentActivities: [],
    roblox: { lastPlayed: { name: 'Another Game', universeId: 9999 } },
    recentRobloxGames: [{ name: 'Soccer', universeId: 9876 }],
  };
  try {
    const [result] = await readGameInfo(bot, [activityGameKey(activity)]);
    assert.equal(result.name, 'Soccer');
    assert.equal(result.source, 'roblox');
    assert.equal(result.screenshots.length, 1);
    assert.ok(calls.every((url) => !url.includes('9999')));
    activity.details = 'An Untracked Game';
    const [fallback] = await readGameInfo(bot, [activityGameKey(activity)]);
    assert.equal(fallback.name, 'Roblox');
    assert.equal(fallback.source, 'discord');
  } finally {
    globalThis.fetch = originalFetch;
  }
});
