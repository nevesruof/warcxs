import { readBot, presencePayload } from '../lib/activity.js';
const STATIC_DISCORD_USER = {
  avatar: '/assets/itake-avatar.jpeg',
  avatar_decoration_data: { asset: 'a_1005898c6acf56a9ac5010baf444f6fd', expires_at: null },
  bot: false,
  collectibles: {
    nameplate: {
      asset: 'nameplates/water_stalker/1516559776023187547/',
      expires_at: null,
      label: "Sinister head with glowing white eyes peeks out above the water's surface",
      palette: 'black',
      sku_id: '1516559776023187547',
    },
  },
  discriminator: '0',
  display_name: 'iTake',
  display_name_styles: { colors: [16777215], effect_id: 4, font_id: 8 },
  global_name: 'iTake',
  id: '1239908273885286546',
  primary_guild: {
    badge: '878c62b6694a4f5931104f766191bec7',
    identity_enabled: true,
    identity_guild_id: '1519060906678554685',
    tag: 'FM',
  },
  public_flags: 64,
  username: 'cheatinformer',
  vad_colors: null,
  clan: {
    badge: '878c62b6694a4f5931104f766191bec7',
    identity_enabled: true,
    identity_guild_id: '1519060906678554685',
    tag: 'FM',
  },
  banner: '/assets/katana-banner.png',
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
