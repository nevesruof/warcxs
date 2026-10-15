import { readBot, presencePayload, USER_ID } from '../lib/activity.js';
import { LIVE_CACHE } from '../lib/http.js';
import { lookupAppIcon } from '../lib/app-icons.js';
const STATIC_DISCORD_USER = {
  "avatar": "26009e0a7070d0ea156a8ec9f3880e74",
  "avatar_decoration_data": null,
  "bot": false,
  "collectibles": null,
  "discriminator": "0",
  "display_name": "Take",
  "display_name_styles": {
    "colors": [
      16777215
    ],
    "effect_id": 4,
    "font_id": 8
  },
  "global_name": "Take",
  "id": USER_ID,
  "public_flags": 64,
  "username": "warcxss",
  "vad_colors": null,
  "clan": {
    "tag": "LTUS",
    "icon": "/assets/ltus-reference.jpeg"
  },
  "banner": null,
  "accent_color": 0
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', LIVE_CACHE);
  if (req.method && req.method !== 'GET') {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(405).json({ success: false });
  }
  try {
    const payload = presencePayload(await readBot(), STATIC_DISCORD_USER);
    // Games without their own artwork still get the app icon (cached per day).
    await Promise.all(
      payload.data.activities
        .filter((a) => a.type === 0 && !a.assets?.large_image)
        .map(async (a) => {
          const icon = await lookupAppIcon({ applicationId: a.application_id, name: a.name }).catch(() => null);
          if (icon) a.assets = { ...a.assets, large_image: icon };
        }),
    );
    return res.status(200).json(payload);
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ success: false, error: 'Activity bot temporarily unavailable' });
  }
}
