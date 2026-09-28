import test from 'node:test';
import assert from 'node:assert/strict';
import { lookupGame } from '../api/game-info.js';

const withEnv = async (env, run) => {
  const saved = { ...process.env };
  Object.assign(process.env, env);
  try {
    await run();
  } finally {
    process.env = saved;
  }
};

test('lookupGame bridges Discord -> IGDB and maps the full game card', async (t) => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push(url.toString());
    if (url.toString().startsWith('https://discord.com/api/v10/applications/'))
      return Response.json({ id: '111222333444555666', name: 'Rainbow Six Siege' });
    if (url.toString().startsWith('https://id.twitch.tv/oauth2/token'))
      return Response.json({ access_token: 'twitch-token', expires_in: 5000000 });
    if (url.toString() === 'https://api.igdb.com/v4/games') {
      assert.equal(options.headers['Client-ID'], 'igdb-client');
      assert.equal(options.headers.Authorization, 'Bearer twitch-token');
      assert.match(options.body, /search "Rainbow Six Siege"/);
      return Response.json([
        {
          id: 7331,
          name: 'Rainbow Six Siege',
          slug: 'rainbow-six-siege',
          summary: 'Tactical shooter.',
          first_release_date: 1448841600,
          rating: 77.3,
          genres: [{ name: 'Shooter' }, { name: 'Tactical' }],
          game_modes: [{ name: 'Multiplayer' }],
          platforms: [{ name: 'PC', abbreviation: 'PC' }],
          involved_companies: [
            { company: { name: 'Ubisoft Montreal' }, developer: true, publisher: false },
            { company: { name: 'Ubisoft Entertainment' }, developer: false, publisher: true },
          ],
          websites: [
            { url: 'https://twitch.tv/rainbow6', category: 6 },
            { url: 'https://r6.example.com/vote', category: 42 },
          ],
          screenshots: [{ image_id: 'shot1' }],
          cover: { image_id: 'cover1' },
        },
      ]);
    }
    throw new Error(`Unexpected request: ${url}`);
  });

  await withEnv({ IGDB_CLIENT_ID: 'igdb-client', IGDB_CLIENT_SECRET: 'igdb-secret' }, async () => {
    const info = await lookupGame('111222333444555666');
    assert.equal(info.source, 'igdb');
    assert.equal(info.igdbId, 7331);
    assert.equal(info.name, 'Rainbow Six Siege');
    assert.deepEqual(info.developers, ['Ubisoft Montreal']);
    assert.deepEqual(info.publishers, ['Ubisoft Entertainment']);
    assert.deepEqual(info.genres, ['Shooter', 'Tactical']);
    assert.equal(info.coverUrl, 'https://images.igdb.com/igdb/image/upload/t_cover_big/cover1.jpg');
    assert.equal(info.screenshots[0], 'https://images.igdb.com/igdb/image/upload/t_1080p/shot1.jpg');
    assert.equal(info.releaseDate, '2015-11-30');
    // The unmapped website category (42) is dropped instead of surfacing as a broken link.
    assert.deepEqual(info.websites, [{ url: 'https://twitch.tv/rainbow6', hostname: 'twitch', category: 6 }]);
  });
  assert.equal(calls.length, 3);
});

test('lookupGame skips non-numeric ids without any network call', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => {
    throw new Error('fetch should not run for an invalid id');
  });
  assert.equal(await lookupGame('not-a-snowflake'), null);
});

test('lookupGame returns null when Discord does not know the application', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) => {
    if (url.toString().startsWith('https://discord.com/')) return new Response('', { status: 404 });
    throw new Error(`Unexpected request: ${url}`);
  });
  assert.equal(await lookupGame('999888777666555444'), null);
});

test('lookupGame throws when IGDB credentials are not configured, so the caller falls back gracefully', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) => {
    if (url.toString().startsWith('https://discord.com/'))
      return Response.json({ name: 'Some Game' });
    throw new Error(`Unexpected request: ${url}`);
  });
  await withEnv({ IGDB_CLIENT_ID: '', IGDB_CLIENT_SECRET: '' }, async () => {
    await assert.rejects(() => lookupGame('222333444555666777'));
  });
});
