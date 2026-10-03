export const DISCORD_USER_ID = "1239908273885286546";
const imageHash = /^(?:a_)?[a-f0-9]{32}$/;
const profileFields = ["avatar", "banner", "accent_color", "discriminator"];

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
  return fields;
}

export function mergeProfileImages(current, incoming) {
  const fields = profileImageFields(incoming);
  if (
    profileFields.every(
      (key) => !Object.hasOwn(fields, key) || current[key] === fields[key],
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
