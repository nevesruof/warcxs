import test from 'node:test';
import assert from 'node:assert/strict';
import {createStatsfm, normalizeClock, normalizeRecent, rangeQuery} from '../src/services/statsfm.js';
import {normalizeLyrics} from '../api/lyrics.js';
import {discordImage} from '../lib/game-art.js';

const response = value => new Response(JSON.stringify(value));
test('Stats dashboard defers albums, uses SDK ordering, and deduplicates concurrent requests', async () => {
  const calls = [];
  const stats = createStatsfm(async url => {
    calls.push(new URL(url));
    if (url.includes('/streams/stats/dates')) return response({items: {hours: {3: {count: 4, durationMs: 120000}}}});
    if (url.includes('/streams/stats')) return response({items: {count: 4, durationMs: 120000}});
    if (url.includes('/top/albums')) return response({items: [{album: {id: 7, name: 'Album'}, streams: {count: 2, durationMs: 90000}}]});
    if (url.includes('/top/')) return response({items: []});
    return response({item: {displayName: 'wArcxs'}});
  });
  const [first, second] = await Promise.all([stats.music(), stats.music()]);
  assert.equal(calls.length, 5);
  assert.deepEqual(first, second);
  assert.equal(first.clock.sourceCount, 4);
  assert.ok(calls.every(url => !url.pathname.includes('/top/albums')));
  const [albums] = await Promise.all([stats.albums(), stats.albums()]);
  const query = calls.at(-1).searchParams;
  assert.equal(query.get('orderBy'), 'COUNT');
  assert.equal(query.has('sortBy'), false);
  assert.equal(albums[0].streams, 2);
  assert.equal(albums[0].minutes, 2);
  assert.equal(calls.length, 6);
});

test('Clock keeps 24 buckets, totals and minute conversion without invented streams', () => {
  const clock = normalizeClock({items: {hours: {0: {count: 3, durationMs: 180000}, 23: {count: 7, durationMs: 420000}}, weekDays: {0: {count: 10}}}});
  assert.equal(clock.hours.length, 24);
  assert.equal(clock.sourceCount, 10);
  assert.equal(clock.peakHour.hour, 23);
  assert.equal(clock.hours[23].minutes, 7);
  assert.equal(clock.hours[23].share, 1);
  assert.equal(clock.weekdays[0].count, 10);
  assert.equal(normalizeClock(null).sourceCount, 0);
});

test('A failed stats request remains retryable and invalid ranges never reach the network', async () => {
  let calls = 0;
  const stats = createStatsfm(async () => { calls++; if (calls === 1) throw Error('offline'); return response({items: []}); });
  await assert.rejects(stats.albums());
  assert.deepEqual(await stats.albums(), []);
  assert.equal(calls, 2);
  assert.throws(() => rangeQuery('bad'), /Unknown/);
  const year = new URLSearchParams(rangeQuery('current_year', Date.UTC(2026, 8, 27)));
  assert.equal(Number(year.get('after')), Date.UTC(2026, 0, 1));
});

test('Recent listening sorts real timestamps and caps at twenty', () => {
  const items = Array.from({length: 25}, (_, i) => ({endTime: new Date(100000 + i * 1000).toISOString(), track: {id: i, name: `Track ${i}`}}));
  const songs = normalizeRecent({items});
  assert.equal(songs.length, 20);
  assert.equal(songs[0].trackName, 'Track 24');
  assert.equal(songs.at(-1).trackName, 'Track 5');
});

test('Lyrics retain LRC timestamps and declare plain/instrumental responses accurately', () => {
  const lrc = '[00:01.50]First line\n[00:08.00]Next line';
  const lyrics = normalizeLyrics({syncedLyrics: lrc, duration: 90}, 'Track', 'Artist');
  assert.equal(lyrics.lineSyncedLyrics, lrc);
  assert.equal(lyrics.status, 'lineSynced');
  assert.equal(lyrics.duration, 90000);
  assert.equal(normalizeLyrics({plainLyrics: 'First line'}, 'Track', 'Artist').status, 'plain');
  assert.equal(normalizeLyrics({instrumental: true}, 'Track', 'Artist').instrumental, true);
  assert.equal(normalizeLyrics(null, 'Track', 'Artist').status, 'none');
});

test('Activity images distinguish external URLs, Discord asset hashes and Spotify artwork', () => {
  assert.equal(discordImage('https://example.com/image.png', '123'), 'https://example.com/image.png');
  assert.equal(discordImage('asset_hash', '123'), 'https://cdn.discordapp.com/app-assets/123/asset_hash.png?size=128');
  assert.equal(discordImage('spotify:abc', null), 'https://i.scdn.co/image/abc');
  assert.equal(discordImage('', '123'), null);
});
