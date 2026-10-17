// Guestbook storage and validation.
//
// Storage is Upstash Redis over its REST API (what Vercel's Redis/KV integration
// provides): no extra dependency, works on serverless. Without the env vars the
// guestbook reports itself as disabled and the page hides the form.
//
//   KV_REST_API_URL / KV_REST_API_TOKEN   (or UPSTASH_REDIS_REST_URL / _TOKEN)
//   GUESTBOOK_SECRET        signs the "delete" links sent to Discord (any long random string)
//   GUESTBOOK_WEBHOOK_URL   optional Discord webhook that announces new entries
//   GUESTBOOK_BLOCKED_WORDS optional, comma separated words to reject

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const NAME_MAX = 24;
export const MESSAGE_MAX = 200;
export const MESSAGE_MIN = 2;
export const LIST_LIMIT = 50;
export const KEEP = 500;
export const POSTS_PER_HOUR = 3;
const INDEX = 'gb:index';
const ITEMS = 'gb:items';

export class GuestbookError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

const redisConfig = () => {
  const url = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '').trim();
  const token = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
};

export const isEnabled = () => redisConfig() !== null;

async function redis(commands, fetchImpl = fetch) {
  const config = redisConfig();
  if (!config) throw new GuestbookError('Guestbook is not set up yet', 503);
  const response = await fetchImpl(`${config.url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) throw new GuestbookError('Guestbook storage unavailable', 503);
  const results = await response.json();
  return results.map((item) => {
    if (item.error) throw new GuestbookError('Guestbook storage error', 503);
    return item.result;
  });
}

// --- validation -----------------------------------------------------------

// Control characters and invisible/bidi characters that are used to fake text.
const INVISIBLE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f​-‏‪-‮⁠-⁤﻿]/g;
const LINK = /(https?:\/\/|www\.|discord\.gg|t\.me\/|\b[a-z0-9-]{2,}\.(com|net|org|gg|io|xyz|ru|cn|me|co|dev|app|link|ly|tk|info|shop|site|top)\b)/i;
const REPEAT = /(.)\1{11,}/u;

export function cleanName(value) {
  const name = String(value ?? '')
    .replace(INVISIBLE, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, NAME_MAX);
  if (LINK.test(name)) throw new GuestbookError("Links aren't allowed");
  return name || 'anonymous';
}

export function cleanMessage(value, blocked = process.env.GUESTBOOK_BLOCKED_WORDS) {
  const message = String(value ?? '')
    .replace(INVISIBLE, '')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (message.length < MESSAGE_MIN) throw new GuestbookError('Write a little more');
  if (message.length > MESSAGE_MAX) throw new GuestbookError(`Keep it under ${MESSAGE_MAX} characters`);
  if (LINK.test(message)) throw new GuestbookError("Links aren't allowed");
  if (REPEAT.test(message)) throw new GuestbookError("That looks like spam");
  const words = String(blocked || '')
    .split(',')
    .map((word) => word.trim().toLowerCase())
    .filter(Boolean);
  const lower = message.toLowerCase();
  if (words.some((word) => lower.includes(word))) throw new GuestbookError("That message can't be posted");
  return message;
}

// --- signing (moderation links) --------------------------------------------

const secret = () => process.env.GUESTBOOK_SECRET?.trim() || '';

export function sign(id) {
  return createHmac('sha256', secret()).update(`delete:${id}`).digest('hex').slice(0, 32);
}

export function verify(id, signature) {
  if (!secret() || typeof signature !== 'string' || signature.length !== 32) return false;
  const expected = Buffer.from(sign(id));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

const hashIp = (ip) => createHash('sha256').update(`${secret()}:${ip}`).digest('hex').slice(0, 24);

// --- storage ----------------------------------------------------------------

const parse = (raw) => {
  try {
    const entry = JSON.parse(raw);
    return entry && typeof entry.id === 'string' ? entry : null;
  } catch {
    return null;
  }
};

export async function listEntries(limit = LIST_LIMIT, fetchImpl) {
  const [ids] = await redis([['ZREVRANGE', INDEX, 0, limit - 1]], fetchImpl);
  if (!ids.length) return [];
  const [raw] = await redis([['HMGET', ITEMS, ...ids]], fetchImpl);
  return raw.map((item) => (item ? parse(item) : null)).filter(Boolean);
}

export async function takeSlot(ip, fetchImpl) {
  const key = `gb:rl:${hashIp(ip)}`;
  const [count] = await redis([['INCR', key]], fetchImpl);
  if (count === 1) await redis([['EXPIRE', key, 3600]], fetchImpl);
  if (count > POSTS_PER_HOUR)
    throw new GuestbookError('Easy there, try again in a while', 429);
}

export async function addEntry({ name, message }, now = Date.now(), fetchImpl) {
  const entry = { id: randomBytes(6).toString('hex'), name, message, createdAt: now };
  await redis(
    [
      ['HSET', ITEMS, entry.id, JSON.stringify(entry)],
      ['ZADD', INDEX, now, entry.id],
    ],
    fetchImpl,
  );
  // Keep the newest KEEP entries.
  const [old] = await redis([['ZRANGE', INDEX, 0, -(KEEP + 1)]], fetchImpl);
  if (old.length)
    await redis(
      [
        ['ZREM', INDEX, ...old],
        ['HDEL', ITEMS, ...old],
      ],
      fetchImpl,
    );
  return entry;
}

export async function removeEntry(id, fetchImpl) {
  if (!/^[a-f0-9]{12}$/.test(id)) return false;
  const [removed] = await redis(
    [
      ['ZREM', INDEX, id],
      ['HDEL', ITEMS, id],
    ],
    fetchImpl,
  ).then((results) => [results[0] + results[1]]);
  return removed > 0;
}

// --- Discord notification ---------------------------------------------------

export async function notify(entry, baseUrl, fetchImpl = fetch) {
  const hook = process.env.GUESTBOOK_WEBHOOK_URL?.trim();
  if (!hook) return;
  const link = secret()
    ? `${baseUrl}/api/guestbook?delete=${entry.id}&sig=${sign(entry.id)}`
    : null;
  const quote = entry.message
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n')
    .slice(0, 900);
  try {
    await fetchImpl(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Guestbook',
        // Visitors can type anything: never let it ping people or roles.
        allowed_mentions: { parse: [] },
        content: `**New guestbook entry** from \`${entry.name.replace(/`/g, "'")}\`\n${quote}${link ? `\n[Remove it](<${link}>)` : ''}`,
      }),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    /* A failed notification must not fail the visitor's post. */
  }
}
