import { cached, fetchJson } from './http.js';

export function discordImage(reference, applicationId) {
  if (!reference) return null;
  if (/^https?:\/\//i.test(reference)) return reference;
  if (reference.startsWith('mp:external/'))
    return `https://media.discordapp.net/external/${reference.slice(12)}`;
  if (reference.startsWith('spotify:')) return `https://i.scdn.co/image/${reference.slice(8)}`;
  if (applicationId && /^[\w-]+$/.test(reference))
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${reference}.png?size=128`;
  return null;
}

export async function activityArt(activity) {
  const image = discordImage(activity.largeImage, activity.applicationId);
  if (image) return { ...activity, largeImage: image };
  if (!/^\d+$/.test(activity.applicationId || '')) return activity;
  const icon = await cached(`discord:icon:${activity.applicationId}`, 86400000, async () => {
    const app = await fetchJson(
      `https://discord.com/api/v10/applications/${activity.applicationId}/rpc`,
    );
    return app.icon
      ? `https://cdn.discordapp.com/app-icons/${activity.applicationId}/${app.icon}.png?size=128`
      : null;
  }).catch(() => null);
  return { ...activity, largeImage: icon };
}
