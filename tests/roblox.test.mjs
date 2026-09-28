import test from 'node:test';
import assert from 'node:assert/strict';
import { readRoblox, ROBLOX_USERNAME } from '../lib/roblox.js';

test('Roblox resolves zahidtql12 and retains bot game data when presence is unavailable', async (t) => {
  const requests = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    requests.push(url);
    if (url.includes('/usernames/users')) {
      assert.deepEqual(JSON.parse(options.body).usernames, ['zahidtql12']);
      return Response.json({
        data: [{ id: 1120046622, name: ROBLOX_USERNAME, displayName: 'Porshe_224' }],
      });
    }
    if (url.includes('/presence/users')) {
      assert.deepEqual(JSON.parse(options.body).userIds, [1120046622]);
      return new Response('', { status: 401 });
    }
    if (url.startsWith('https://games.roblox.com/')) {
      return Response.json({
        data: [
          { rootPlaceId: 789, name: 'Tracked game', creator: { name: 'Creator' }, playing: 10 },
        ],
      });
    }
    if (url.startsWith('https://thumbnails.roblox.com/')) {
      return Response.json({
        data: [{ state: 'Completed', imageUrl: 'https://example.com/game.png' }],
      });
    }
    throw new Error(`Unexpected request: ${url}`);
  });
  const profile = await readRoblox({ roblox: { lastPlayedGame: { universeId: 456 } } });
  assert.equal(profile.username, 'zahidtql12');
  assert.equal(profile.lastPlayedGame.name, 'Tracked game');
  assert.equal(profile.lastPlayedGame.iconUrl, 'https://example.com/game.png');
  assert.equal(profile.lastPlayedGame.universeId, 456);
  assert.equal(profile.isPlaying, false);
  assert.equal(requests.length, 4);
});
