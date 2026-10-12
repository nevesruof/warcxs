import { readBot, presencePayload, USER_ID } from '../lib/activity.js';
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
  res.setHeader('Cache-Control', 'no-store');
  if (req.method && req.method !== 'GET') return res.status(405).json({ success: false });
  try {
    return res.status(200).json(presencePayload(await readBot(), STATIC_DISCORD_USER));
  } catch {
    return res.status(503).json({ success: false, error: 'Activity bot temporarily unavailable' });
  }
}
