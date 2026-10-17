import test from "node:test";
import assert from "node:assert/strict";

process.env.KV_REST_API_URL = "https://redis.example";
process.env.KV_REST_API_TOKEN = "t";
process.env.GUESTBOOK_SECRET = "s3cret-for-tests";

// Tiny in-memory Upstash: just the commands the guestbook uses.
function fakeRedis() {
  const hashes = new Map();
  const zsets = new Map();
  const strings = new Map();
  const H = (k) => hashes.get(k) || hashes.set(k, new Map()).get(k);
  const Z = (k) => zsets.get(k) || zsets.set(k, new Map()).get(k);
  const sorted = (k) => [...Z(k)].sort((a, b) => a[1] - b[1]).map(([id]) => id);
  const slice = (arr, a, b) => arr.slice(a < 0 ? arr.length + a : a, (b < 0 ? arr.length + b : b) + 1);
  const run = ([cmd, ...a]) => {
    switch (cmd) {
      case "HSET": H(a[0]).set(a[1], a[2]); return 1;
      case "ZADD": Z(a[0]).set(a[2], Number(a[1])); return 1;
      case "ZREVRANGE": return slice(sorted(a[0]).reverse(), a[1], a[2]);
      case "ZRANGE": return slice(sorted(a[0]), a[1], a[2]);
      case "HMGET": return a.slice(1).map((id) => H(a[0]).get(id) ?? null);
      case "ZREM": return a.slice(1).filter((id) => Z(a[0]).delete(id)).length;
      case "HDEL": return a.slice(1).filter((id) => H(a[0]).delete(id)).length;
      case "INCR": strings.set(a[0], (strings.get(a[0]) || 0) + 1); return strings.get(a[0]);
      case "EXPIRE": return 1;
      default: throw new Error(`unsupported ${cmd}`);
    }
  };
  return async (url, options) => {
    assert.equal(url, "https://redis.example/pipeline");
    return Response.json(JSON.parse(options.body).map((c) => ({ result: run(c) })));
  };
}

const guestbook = await import("../lib/guestbook.js");
const handlerModule = await import("../api/guestbook.js");

function call(handler, { method = "GET", url = "/api/guestbook", body, headers = {} } = {}) {
  return new Promise((resolve) => {
    const res = {
      headers: {},
      setHeader(k, v) { this.headers[k] = v; },
      status(code) { this.code = code; return this; },
      json(payload) { resolve({ code: this.code, body: payload, headers: this.headers }); },
      send(payload) { resolve({ code: this.code, body: payload, headers: this.headers }); },
    };
    handler({ method, url, body, headers: { host: "warcxs.com", ...headers }, socket: {} }, res);
  });
}

test("validation: names, messages, links and invisible characters", () => {
  assert.equal(guestbook.cleanName("  ​Take  "), "Take");
  assert.equal(guestbook.cleanName(""), "anonymous");
  assert.throws(() => guestbook.cleanName("free-nitro.gg"), /Links/);
  assert.equal(guestbook.cleanMessage("hola\n\n\n\nmundo"), "hola\n\nmundo");
  assert.throws(() => guestbook.cleanMessage("x"), /more/);
  assert.throws(() => guestbook.cleanMessage("a".repeat(201)), /under/);
  assert.throws(() => guestbook.cleanMessage("visit https://spam.example"), /Links/);
  assert.throws(() => guestbook.cleanMessage("go to spam.com now"), /Links/);
  assert.throws(() => guestbook.cleanMessage("aaaaaaaaaaaaaaaa"), /spam/);
  assert.throws(() => guestbook.cleanMessage("badword here", "badword"), /can't/);
  assert.equal(guestbook.cleanMessage("<b>hi</b> there"), "<b>hi</b> there"); // stored as text, rendered as text
});

test("signed links verify only for the right entry", () => {
  const sig = guestbook.sign("abc123abc123");
  assert.equal(guestbook.verify("abc123abc123", sig), true);
  assert.equal(guestbook.verify("abc123abc124", sig), false);
  assert.equal(guestbook.verify("abc123abc123", "x".repeat(32)), false);
  assert.equal(guestbook.verify("abc123abc123", undefined), false);
});

test("create, list newest first, rate limit, honeypot and fast-bot checks", async (t) => {
  const original = globalThis.fetch;
  globalThis.fetch = fakeRedis();
  t.after(() => (globalThis.fetch = original));
  const post = (body, extra = {}) =>
    call(handlerModule.default, { method: "POST", body: { elapsed: 5000, ...body }, headers: { "x-real-ip": "1.2.3.4", ...extra } });

  assert.equal((await post({ name: "Ana", message: "hello there" })).code, 201);
  assert.equal((await post({ name: "Beto", message: "second one" })).code, 201);
  const list = await call(handlerModule.default);
  assert.equal(list.body.enabled, true);
  assert.deepEqual(list.body.entries.map((e) => e.name), ["Beto", "Ana"]);
  assert.ok(!("ip" in list.body.entries[0]));

  assert.equal((await post({ message: "third one" })).code, 201);
  assert.equal((await post({ message: "fourth one" })).code, 429); // 3 per hour per IP

  const bot = await post({ message: "hi bot", website: "http://x" }, { "x-real-ip": "9.9.9.9" });
  assert.equal(bot.code, 201);
  assert.equal(bot.body.entry, null);
  assert.equal((await call(handlerModule.default, { method: "GET" })).body.entries.length, 3);

  const fast = await call(handlerModule.default, { method: "POST", body: { message: "too fast", elapsed: 100 }, headers: { "x-real-ip": "8.8.8.8" } });
  assert.equal(fast.code, 400);
  const foreign = await post({ message: "cross site" }, { "x-real-ip": "7.7.7.7", origin: "https://evil.example" });
  assert.equal(foreign.code, 403);
});

test("moderation link: GET only confirms, POST removes", async (t) => {
  const original = globalThis.fetch;
  globalThis.fetch = fakeRedis();
  t.after(() => (globalThis.fetch = original));
  const posted = await call(handlerModule.default, { method: "POST", body: { name: "X", message: "remove me", elapsed: 5000 }, headers: { "x-real-ip": "5.5.5.5" } });
  const id = posted.body.entry.id;
  const sig = guestbook.sign(id);
  const confirm = await call(handlerModule.default, { url: `/api/guestbook?delete=${id}&sig=${sig}` });
  assert.equal(confirm.code, 200);
  assert.equal((await call(handlerModule.default)).body.entries.length, 1, "a GET (link preview) must not delete");
  const bad = await call(handlerModule.default, { method: "POST", body: { delete: id, sig: "0".repeat(32) } });
  assert.equal(bad.code, 403);
  const done = await call(handlerModule.default, { method: "POST", body: { delete: id, sig } });
  assert.equal(done.code, 200);
  assert.equal((await call(handlerModule.default)).body.entries.length, 0);
});

test("without storage configured the guestbook reports itself disabled", async () => {
  const keep = { ...process.env };
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  const list = await call(handlerModule.default);
  assert.equal(list.body.enabled, false);
  const post = await call(handlerModule.default, { method: "POST", body: { message: "hello", elapsed: 5000 } });
  assert.equal(post.code, 503);
  Object.assign(process.env, keep);
});
