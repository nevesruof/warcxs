import { cached, fetchJson } from './http.js';

const DAY = 86400000;
const normalize = (name) =>
  String(name || '')
    .normalize('NFKD')
    .replace(/[™®]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const appIconUrl = (applicationId, hash, size = 128) =>
  applicationId && hash
    ? `https://cdn.discordapp.com/app-icons/${applicationId}/${hash}.png?size=${size}`
    : null;

// Discord's public list of games it detects by process name. Many of them
// (Minecraft, Where Winds Meet…) have no usable /rpc entry, but they do have
// an icon here. Cached per instance; the list is large, so it is fetched once.
async function detectable() {
  return cached('discord:detectable', 6 * 3600 * 1000, async () => {
    const list = await fetchJson('https://discord.com/api/v10/applications/detectable');
    const byId = new Map();
    const byName = new Map();
    for (const app of Array.isArray(list) ? list : []) {
      const hash = app.icon_hash || app.icon;
      if (!app?.id || !hash) continue;
      const entry = { id: String(app.id), hash };
      byId.set(entry.id, entry);
      for (const name of [app.name, ...(app.aliases || [])]) {
        const key = normalize(name);
        if (key && !byName.has(key)) byName.set(key, entry);
      }
    }
    return { byId, byName };
  });
}

// Public application metadata (name, icon, description); shared by every caller
// so one game costs one request per day.
export const applicationInfo = (applicationId) =>
  cached(`discord:rpc:${applicationId}`, DAY, () =>
    fetchJson(`https://discord.com/api/v10/applications/${applicationId}/rpc`),
  );

async function rpcIcon(applicationId) {
  return (await applicationInfo(applicationId).catch(() => null))?.icon || null;
}

/**
 * Best-effort icon URL for a game. Tries the application's own icon, then
 * Discord's detectable list by id, then by name (for activities that carry no
 * application id, such as a plain "Minecraft"). Never throws.
 */
export async function lookupAppIcon({ applicationId, name } = {}, size = 128) {
  const id = /^\d{5,25}$/.test(String(applicationId || '')) ? String(applicationId) : null;
  if (id) {
    const hash = await rpcIcon(id);
    if (hash) return appIconUrl(id, hash, size);
  }
  const lists = await detectable().catch(() => null);
  if (!lists) return null;
  const hit = (id && lists.byId.get(id)) || lists.byName.get(normalize(name));
  return hit ? appIconUrl(hit.id, hit.hash, size) : null;
}
