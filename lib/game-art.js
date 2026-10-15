import { lookupAppIcon } from './app-icons.js';

export function discordImage(reference, applicationId) {
  if (!reference) return null;
  if (/^https:\/\//i.test(reference)) return reference; // never plain http
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
  const icon = await lookupAppIcon(activity).catch(() => null);
  return icon ? { ...activity, largeImage: icon } : activity;
}
