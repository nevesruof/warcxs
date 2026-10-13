import test from 'node:test';
import assert from 'node:assert/strict';
import { endpoint, rateLimit, LIVE_CACHE } from '../lib/http.js';
import { historyPayload } from '../lib/activity.js';
import { discordImage } from '../lib/game-art.js';
import presence from '../api/presence.js';

const response = () => ({
  headers: {},
  setHeader(key, value) {
    this.headers[key] = value;
  },
  status(code) {
    this.code = code;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  },
});

test('rateLimit blocks after the limit, per client and per scope', () => {
  const req = { headers: { 'x-real-ip': '203.0.113.9' } };
  for (let i = 0; i < 3; i++) rateLimit(req, 'unit-a', 3);
  assert.throws(
    () => rateLimit(req, 'unit-a', 3),
    (error) => error.status === 429 && error.expose === true && error.retryAfter >= 1,
  );
  rateLimit({ headers: { 'x-real-ip': '203.0.113.10' } }, 'unit-a', 3);
  rateLimit(req, 'unit-b', 3);
});

test('rateLimit uses the first x-forwarded-for hop when x-real-ip is absent', () => {
  const req = { headers: { 'x-forwarded-for': '198.51.100.7, 10.0.0.1' } };
  rateLimit(req, 'unit-xff', 1);
  assert.throws(() => rateLimit({ headers: { 'x-forwarded-for': '198.51.100.7' } }, 'unit-xff', 1));
});

test('endpoint sets stale-while-revalidate caching, answers 429, and never caches errors', async () => {
  const handler = endpoint(
    async (_params, req) => {
      rateLimit(req, 'unit-c', 1);
      return { ok: true };
    },
    { maxAge: 10, staleWhileRevalidate: 30 },
  );
  const req = { method: 'GET', url: '/api/x', headers: { 'x-real-ip': '203.0.113.20' } };
  const ok = response();
  await handler(req, ok);
  assert.equal(ok.code, 200);
  assert.equal(ok.headers['Cache-Control'], 'public, s-maxage=10, stale-while-revalidate=30');
  const limited = response();
  await handler(req, limited);
  assert.equal(limited.code, 429);
  assert.equal(limited.headers['Cache-Control'], 'no-store');
  assert.ok(Number(limited.headers['Retry-After']) >= 1);
  assert.equal(limited.body.error, 'Too many requests');
});

test('Upstream failures stay 503 even when the upstream said 429, and are never cached', async () => {
  const handler = endpoint(
    async () => {
      const error = new Error('Upstream returned 429');
      error.status = 429;
      throw error;
    },
    { maxAge: 3600 },
  );
  const out = response();
  await handler({ method: 'GET', url: '/api/y' }, out);
  assert.equal(out.code, 503);
  assert.equal(out.headers['Cache-Control'], 'no-store');
  assert.equal(out.body.error, 'Service temporarily unavailable');
});

test('Live endpoints use the short CDN cache and drop it for non-GET requests', async () => {
  const denied = response();
  await presence({ method: 'POST' }, denied);
  assert.equal(denied.code, 405);
  assert.equal(denied.headers['Cache-Control'], 'no-store');
  assert.match(LIVE_CACHE, /s-maxage=5/);
});

test('Only https links and images from the bot reach the browser', () => {
  const now = Date.now() / 1000;
  const { recentSongs } = historyPayload({
    recentActivities: [],
    recentSongs: [
      { sessionId: 1, name: 'Bad', artist: 'A', lastSeen: now - 10, url: 'javascript:alert(1)' },
      { sessionId: 2, name: 'Plain', artist: 'A', lastSeen: now - 20, url: 'http://open.spotify.com/track/x' },
      { sessionId: 3, name: 'Good', artist: 'A', lastSeen: now - 30, url: 'https://open.spotify.com/track/x' },
    ],
  });
  assert.deepEqual(
    recentSongs.map((song) => song.spotifyUrl),
    [null, null, 'https://open.spotify.com/track/x'],
  );
  assert.equal(discordImage('http://tracker.example/pixel.png', '123'), null);
  assert.equal(discordImage('https://example.com/image.png', '123'), 'https://example.com/image.png');
});
