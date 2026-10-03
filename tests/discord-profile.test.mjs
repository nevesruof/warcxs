import test from "node:test";
import assert from "node:assert/strict";
import {
  DISCORD_USER_ID as id,
  profileImageFields,
  mergeProfileImages,
  discordAvatarUrl,
  discordBannerUrl,
  createProfileTracker,
} from "../src/services/discord-profile.js";
import profileHandler from "../api/profile.js";

const avatar = "1".repeat(32);
const banner = `a_${"2".repeat(32)}`;
const user = { id, avatar, banner, discriminator: "0" };

test("Static and animated images use Discord CDN hashes, without cache-busting reloads", () => {
  assert.equal(
    discordAvatarUrl(user),
    `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=512`,
  );
  assert.equal(
    discordBannerUrl(user),
    `https://cdn.discordapp.com/banners/${id}/${banner}.webp?size=1024&animated=true`,
  );
  assert.match(discordAvatarUrl({ ...user, avatar: banner }), /animated=true$/);
  assert.equal(discordBannerUrl({ ...user, banner: null }), null);
  assert.match(
    discordAvatarUrl({ ...user, avatar: null }),
    /embed\/avatars\/\d\.png$/,
  );
  assert.equal(
    discordAvatarUrl({ ...user, avatar: "/assets/itake-avatar.jpeg" }),
    "/assets/itake-avatar.jpeg",
  );
  assert.equal(
    discordBannerUrl({
      ...user,
      banner: "https://untrusted.example/banner.gif",
    }),
    null,
  );
});

test("Profile changes retain badges and bio, remove explicitly deleted images, and reject other users", () => {
  const current = { ...user, bio: "My bio", badges: ["skull"] };
  assert.equal(mergeProfileImages(current, user), current);
  const removed = mergeProfileImages(current, {
    id,
    avatar: null,
    banner: null,
  });
  assert.equal(removed.avatar, null);
  assert.equal(removed.banner, null);
  assert.equal(removed.bio, "My bio");
  assert.deepEqual(removed.badges, ["skull"]);
  assert.equal(mergeProfileImages(current, { id, avatar }).banner, banner);
  assert.throws(() => profileImageFields({ ...user, id: "another-user" }));
  assert.throws(() => profileImageFields({ ...user, avatar: "invalid" }));
});

test("Tracker restores saved images, deduplicates requests, updates GIFs and retains images on failure", async () => {
  let time = 1000;
  let payload = { user };
  let calls = 0;
  let writes = 0;
  const published = [];
  const tracker = createProfileTracker({
    read: () => user,
    request: async () => {
      calls++;
      if (payload instanceof Error) throw payload;
      return payload;
    },
    save: () => writes++,
    publish: (value) => published.push(value),
    now: () => time,
  });
  assert.equal(tracker.current().banner, banner);
  await Promise.all([tracker.refresh(), tracker.refresh()]);
  assert.equal(calls, 1);
  assert.equal(
    writes,
    0,
    "An unchanged profile should not write storage or rerender",
  );
  payload = { user: { id, avatar: banner, banner: avatar } };
  time += 60000;
  await tracker.refresh();
  assert.equal(published.length, 1);
  assert.match(discordAvatarUrl(tracker.current()), /animated=true/);
  assert.doesNotMatch(discordBannerUrl(tracker.current()), /animated=true/);
  time += 60000;
  payload = Error("temporary failure");
  await tracker.refresh();
  assert.equal(tracker.current().avatar, banner);
  assert.equal(published.length, 1);
  time += 60000;
  payload = { user: { id, avatar: null, banner: null } };
  await tracker.refresh();
  assert.equal(tracker.current().banner, null);
  assert.equal(published.length, 2);
});

test("Profile API keeps bot credentials on the server, whitelists fields and shares concurrent requests", async (t) => {
  const previous = process.env.DISCORD_BOT_TOKEN;
  process.env.DISCORD_BOT_TOKEN = "test-profile-token";
  t.after(() => {
    if (previous === undefined) delete process.env.DISCORD_BOT_TOKEN;
    else process.env.DISCORD_BOT_TOKEN = previous;
  });
  let calls = 0;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls++;
    assert.equal(url, `https://discord.com/api/v10/users/${id}`);
    assert.equal(options.headers.Authorization, "Bot test-profile-token");
    return Response.json({
      ...user,
      email: "private@example.test",
      secret: "not-for-browser",
    });
  });
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
  const a = response();
  const b = response();
  await Promise.all([
    profileHandler({ method: "GET" }, a),
    profileHandler({ method: "GET" }, b),
  ]);
  assert.equal(calls, 1);
  assert.equal(a.code, 200);
  assert.equal(a.headers["Cache-Control"], "no-store");
  assert.equal(a.body.refreshAfterMs, 60000);
  assert.deepEqual(a.body.user, user);
  assert.equal(a.body.user.secret, undefined);
  const denied = response();
  await profileHandler({ method: "POST" }, denied);
  assert.equal(denied.code, 405);
});

test("Profile API reports errors without replacing a valid profile with empty image data", async (t) => {
  delete process.env.DISCORD_BOT_TOKEN;
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("", { status: 503 }),
  );
  const response = {
    setHeader() {},
    status(code) {
      this.code = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
  await profileHandler({ method: "GET" }, response);
  assert.equal(response.code, 503);
  assert.equal(response.body.user, undefined);
});
