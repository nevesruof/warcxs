import { DISCORD_USER_ID } from "../config/discord.js";
export { DISCORD_USER_ID };
const imageHash = /^(?:a_)?[a-f0-9]{32}$/;
const profileFields = [
  "avatar",
  "banner",
  "accent_color",
  "discriminator",
  "username",
  "global_name",
  "display_name",
  "display_name_styles",
];

// Names are plain text shown in the UI: strip control characters, cap length.
function cleanName(value) {
  if (typeof value !== "string") return null;
  const text = value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 64);
  return text || null;
}

// Display-name style (font, effect, colours) as Discord reports it; anything
// malformed is ignored so the style that is already shown stays.
function cleanStyles(value) {
  if (!value || typeof value !== "object") return null;
  const int = (n, max) => Number.isInteger(n) && n >= 0 && n <= max;
  if (!int(value.font_id, 100) || !int(value.effect_id, 100)) return null;
  const colors = Array.isArray(value.colors) ? value.colors : [];
  if (colors.length > 3 || !colors.every((c) => int(c, 16777215))) return null;
  return { font_id: value.font_id, effect_id: value.effect_id, colors };
}

export function profileImageFields(user) {
  if (user?.id !== DISCORD_USER_ID)
    throw new Error("Unexpected Discord profile");
  const fields = { id: user.id };
  for (const key of ["avatar", "banner"]) {
    if (!Object.hasOwn(user, key)) continue;
    if (
      user[key] !== null &&
      (typeof user[key] !== "string" || !imageHash.test(user[key]))
    )
      throw new Error(`Invalid Discord ${key}`);
    fields[key] = user[key];
  }
  if (!Object.hasOwn(fields, "avatar"))
    throw new Error("Missing Discord avatar");
  if (user.accent_color === null || Number.isInteger(user.accent_color))
    fields.accent_color = user.accent_color;
  if (/^\d{1,4}$/.test(user.discriminator))
    fields.discriminator = user.discriminator;
  // Names follow the live account; a missing name keeps the last known one.
  const username = cleanName(user.username);
  const globalName = cleanName(user.global_name);
  if (username) fields.username = username;
  if (globalName) {
    fields.global_name = globalName;
    fields.display_name = globalName;
  } else if (username && Object.hasOwn(user, "global_name")) {
    fields.global_name = null;
    fields.display_name = username;
  }
  if (Object.hasOwn(user, "display_name_styles")) {
    const styles = cleanStyles(user.display_name_styles);
    if (styles) fields.display_name_styles = styles;
    else if (user.display_name_styles === null) fields.display_name_styles = null;
  }
  return fields;
}

const same = (a, b) =>
  a === b || (a && b && typeof a === "object" && JSON.stringify(a) === JSON.stringify(b));

export function mergeProfileImages(current, incoming) {
  const fields = profileImageFields(incoming);
  if (
    profileFields.every(
      (key) => !Object.hasOwn(fields, key) || same(current[key], fields[key]),
    )
  )
    return current;
  // Explicit nulls remove an image; omitted fields keep the last known value.
  return { ...current, ...fields };
}

function imageUrl(user, kind, size) {
  const value = user?.[kind];
  if (typeof value !== "string" || !value) return null;
  if (value.startsWith("/assets/")) return value;
  if (imageHash.test(value) && /^\d{17,20}$/.test(user.id)) {
    const animated = value.startsWith("a_") ? "&animated=true" : "";
    return `https://cdn.discordapp.com/${kind}s/${user.id}/${value}.webp?size=${size}${animated}`;
  }
  // Older saved profiles can contain a complete CDN URL instead of a hash.
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "cdn.discordapp.com"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function discordAvatarUrl(user, size = 512) {
  const avatar = imageUrl(user, "avatar", size);
  if (avatar) return avatar;
  const legacy = Number(user?.discriminator) || 0;
  const id = /^\d{17,20}$/.test(user?.id) ? user.id : DISCORD_USER_ID;
  const index = legacy ? legacy % 5 : Number((BigInt(id) >> 22n) % 6n);
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

export const discordBannerUrl = (user, size = 1024) =>
  imageUrl(user, "banner", size);

export function createProfileTracker({
  request,
  read,
  save,
  publish,
  now = Date.now,
}) {
  let user;
  try {
    const saved = read();
    if (saved) user = profileImageFields(saved);
  } catch {
    // A stale/invalid stored profile should not prevent loading the page.
  }
  let pending;
  let checkedAt = 0;
  let refreshAfter = 60000;
  return {
    current: () => user,
    refresh() {
      if (pending) return pending;
      if (checkedAt && now() - checkedAt < refreshAfter)
        return Promise.resolve(user);
      checkedAt = now();
      pending = Promise.resolve()
        .then(request)
        .then((profile) => {
          const next = mergeProfileImages(
            user || { id: DISCORD_USER_ID },
            profile.user,
          );
          refreshAfter = Math.max(
            60000,
            Number(profile.refreshAfterMs) || 60000,
          );
          if (next !== user) {
            user = next;
            save(user);
            publish(user);
          }
          return user;
        })
        .catch(() => {
          refreshAfter = 60000;
          return user;
        })
        .finally(() => {
          pending = null;
        });
      return pending;
    },
  };
}
