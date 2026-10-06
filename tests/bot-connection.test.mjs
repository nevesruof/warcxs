import test from 'node:test';
import assert from 'node:assert/strict';
import { readBot, USER_ID } from '../lib/activity.js';
import presence from '../api/presence.js';
import history from '../api/game-activity.js';

function configure(t, url, token) {
  for (const [key, value] of Object.entries({ ACTIVITY_BOT_URL: url, ACTIVITY_BOT_TOKEN: token })) {
    const previous = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
    t.after(() => {
      if (previous === undefined) delete process.env[key];
      else process.env[key] = previous;
    });
  }
}

const response = () => ({
  setHeader() {},
  status(code) {
    this.code = code;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  },
});

function fixture() {
  const now = Date.now();
  return {
    discordUserId: USER_ID,
    discord: {
      connected: true,
      status: 'online',
      updatedAt: now / 1000,
      activities: [{ kind: 'playing', name: 'Minecraft', startMs: now - 60000 }],
    },
    recentActivities: [
      {
        sessionId: 1,
        kind: 'playing',
        name: 'Minecraft',
        firstSeen: now / 1000 - 60,
        lastSeen: now / 1000,
      },
    ],
  };
}

test('Existing bot powers presence and history without environment configuration', async (t) => {
  configure(t, undefined, 'unused-token');
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options });
    return Response.json(fixture());
  });
  const live = response();
  const recent = response();
  await Promise.all([presence({ method: 'GET' }, live), history({ method: 'GET' }, recent)]);
  assert.equal(live.code, 200);
  assert.equal(live.body.data.discord_status, 'online');
  assert.equal(live.body.data.activities[0].name, 'Minecraft');
  assert.equal(recent.code, 200);
  assert.equal(recent.body.recentActivities[0].name, 'Minecraft');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'http://fi10.bot-hosting.cloud:26022/api/activity');
  assert.deepEqual(calls[0].options.headers, {});
  process.env.ACTIVITY_BOT_URL = '  ';
  await readBot();
  assert.equal(calls.length, 1, 'An empty override must still use the existing bot');
});

test('An explicit bot override and token take precedence over the default', async (t) => {
  configure(t, 'https://activity.example/api/activity', 'test-token');
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://activity.example/api/activity');
    assert.equal(options.headers.Authorization, 'Bearer test-token');
    return Response.json(fixture());
  });
  assert.equal((await readBot()).discordUserId, USER_ID);
});

test('A failed bot request remains retryable without inventing offline status', async (t) => {
  configure(t, 'https://retry.example/api/activity', undefined);
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async () => {
    if (++calls === 1) return new Response('', { status: 503 });
    return Response.json(fixture());
  });
  const failed = response();
  await presence({ method: 'GET' }, failed);
  assert.equal(failed.code, 503);
  assert.equal(failed.body.success, false);
  const recovered = response();
  await presence({ method: 'GET' }, recovered);
  assert.equal(recovered.body.data.discord_status, 'online');
});
