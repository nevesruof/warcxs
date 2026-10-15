import test from 'node:test';
import assert from 'node:assert/strict';
import { findVideos, apiFailureReason, parseSearchPage } from '../lib/youtube.js';

const page = (...ids) => ids.map((id) => `{"videoRenderer":{"videoId":"${id}","thumbnail":{}}}`).join(',');
const json = (body, status = 200) => Response.json(body, { status });

test('API results are used when the key works', async () => {
  const result = await findVideos(
    { track: 'Song', artist: 'Artist' },
    { apiKey: 'k', fetchImpl: async () => json({ items: [{ id: { videoId: 'aaaaaaaaaaa' } }, { id: {} }] }) },
  );
  assert.deepEqual(result.videoIds, ['aaaaaaaaaaa']);
  assert.equal(result.source, 'youtube-api');
  assert.equal(result.reason, undefined);
});

test('exhausted quota falls back to the search page and reports why', async () => {
  const calls = [];
  const result = await findVideos(
    { track: 'Song', artist: 'Artist' },
    {
      apiKey: 'k',
      fetchImpl: async (url) => {
        calls.push(String(url));
        return String(url).includes('googleapis')
          ? json({ error: { errors: [{ reason: 'quotaExceeded' }] } }, 403)
          : new Response(page('bbbbbbbbbbb', 'ccccccccccc', 'bbbbbbbbbbb'));
      },
    },
  );
  assert.deepEqual(result.videoIds, ['bbbbbbbbbbb', 'ccccccccccc']);
  assert.equal(result.source, 'youtube-scrape');
  assert.equal(result.apiReason, 'youtube-quota-exceeded');
  assert.equal(calls.length, 2);
});

test('without a key the fallback runs; with it switched off the reason is explicit', async () => {
  const fetchImpl = async () => new Response(page('ddddddddddd'));
  assert.equal((await findVideos({ track: 't', artist: 'a' }, { apiKey: '', fetchImpl })).videoId, 'ddddddddddd');
  const off = await findVideos({ track: 't', artist: 'a' }, { apiKey: '', scrape: 'off', fetchImpl });
  assert.equal(off.available, false);
  assert.equal(off.reason, 'youtube-not-configured');
});

test('an API that finds nothing is not retried through the fallback', async () => {
  let calls = 0;
  const result = await findVideos(
    { track: 't', artist: 'a' },
    { apiKey: 'k', fetchImpl: async () => (calls++, json({ items: [] })) },
  );
  assert.equal(calls, 1);
  assert.equal(result.reason, 'no-results');
});

test('network failures are reported, never thrown', async () => {
  const result = await findVideos(
    { track: 't', artist: 'a' },
    { apiKey: 'k', scrape: 'off', fetchImpl: async () => { throw new Error('offline'); } },
  );
  assert.equal(result.available, false);
  assert.equal(result.reason, 'youtube-unreachable');
});

test('failure reasons and page parsing', () => {
  assert.equal(apiFailureReason(403, { error: { message: 'The request cannot be completed because you have exceeded your quota.' } }), 'youtube-quota-exceeded');
  assert.equal(apiFailureReason(400, { error: { errors: [{ reason: 'keyInvalid' }] } }), 'youtube-key-rejected');
  assert.equal(apiFailureReason(500, null), 'youtube-error');
  assert.deepEqual(parseSearchPage(page('eeeeeeeeeee') + '"videoRenderer":{"videoId":"short"'), ['eeeeeeeeeee']);
});
