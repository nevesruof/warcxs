import test from 'node:test';
import assert from 'node:assert/strict';
import { lookupAppIcon, appIconUrl } from '../lib/app-icons.js';
import { activityArt } from '../lib/game-art.js';

const detectable = [
  { id: '1111111111', name: 'Minecraft', aliases: ['Minecraft: Java Edition'], icon_hash: 'mchash' },
  { id: '2222222222', name: 'Where Winds Meet', icon: 'wwmhash' },
  { id: '3333333333', name: 'Broken', icon_hash: null },
];

function mockDiscord(t, { rpc = {} } = {}) {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (input) => {
    const url = new URL(input);
    calls.push(url.pathname);
    if (url.pathname.endsWith('/detectable')) return Response.json(detectable);
    const match = url.pathname.match(/applications\/(\d+)\/rpc/);
    if (match && rpc[match[1]]) return Response.json(rpc[match[1]]);
    return new Response('{}', { status: 404 });
  });
  return calls;
}

test('icon URL needs both id and hash', () => {
  assert.equal(appIconUrl('1', 'abc', 64), 'https://cdn.discordapp.com/app-icons/1/abc.png?size=64');
  assert.equal(appIconUrl('1', null), null);
});

test('activities without application id are matched by name or alias in the detectable list', async (t) => {
  mockDiscord(t);
  assert.match(await lookupAppIcon({ name: 'Minecraft' }), /app-icons\/1111111111\/mchash\.png/);
  assert.match(await lookupAppIcon({ name: 'minecraft: java edition' }), /1111111111/);
  assert.match(await lookupAppIcon({ name: 'Where Winds Meet' }), /2222222222\/wwmhash/);
  assert.equal(await lookupAppIcon({ name: 'Unknown game' }), null);
  assert.equal(await lookupAppIcon({ name: 'Broken' }), null);
});

test('the application own icon wins; otherwise the detectable entry for its id is used', async (t) => {
  mockDiscord(t, { rpc: { 5555555555: { icon: 'ownhash' } } });
  assert.match(await lookupAppIcon({ applicationId: '5555555555', name: 'X' }), /5555555555\/ownhash/);
  assert.match(await lookupAppIcon({ applicationId: '2222222222', name: 'Whatever' }), /2222222222\/wwmhash/);
});

test('activityArt keeps explicit art and falls back to the looked-up icon', async (t) => {
  mockDiscord(t);
  const explicit = await activityArt({ name: 'Minecraft', largeImage: 'https://example.com/a.png' });
  assert.equal(explicit.largeImage, 'https://example.com/a.png');
  const resolved = await activityArt({ name: 'Minecraft', largeImage: undefined });
  assert.match(resolved.largeImage, /mchash/);
  const none = await activityArt({ name: 'Nothing known' });
  assert.equal(none.largeImage, undefined);
});
