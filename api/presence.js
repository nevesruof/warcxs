// api/presence.js — Vercel serverless function.
// Corre en el servidor de Vercel (no en el navegador), asi que puede hablarle
// por HTTP plano al bot en bot-hosting.net sin lios de mixed content/CORS.

const BOT_URL = 'http://fi4.bot-hosting.cloud:25319/api/activity';

// Datos estaticos del perfil de Discord (avatar, banner, decoraciones) que no
// cambian segundo a segundo. Se mezclan con lo que sí es dinamico (status,
// activities) para no tener que tocar el bundle del frontend, que ya espera
// exactamente esta forma tipo Lanyard.
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

const ACTIVITY_TYPE = { Playing: 0, Streaming: 1, Listening: 2, Watching: 3, Custom: 4, Competing: 5 };

function toLanyardActivity(item) {
  if (item.kind === 'spotify') {
    return {
      name: 'Spotify',
      type: ACTIVITY_TYPE.Listening,
      details: item.name,
      state: item.artist,
      assets: { large_image: item.image, large_text: item.album },
      sync_id: item.trackId,
    };
  }
  return {
    name: item.name,
    type: ACTIVITY_TYPE[item.kind] ?? ACTIVITY_TYPE.Playing,
    details: item.details ?? null,
    state: item.state ?? null,
    assets: item.image ? { large_image: item.image } : undefined,
    timestamps: { start: Date.now() },
  };
}

export default async function handler(req, res) {
  try {
    const headers = {};
    if (process.env.ACTIVITY_BOT_TOKEN) {
      headers.Authorization = `Bearer ${process.env.ACTIVITY_BOT_TOKEN}`;
    }
    const r = await fetch(BOT_URL, { headers, signal: AbortSignal.timeout(5000) });
    if (!r.ok) throw new Error(`bot respondio ${r.status}`);
    const bot = await r.json();

    const spotifyItem = bot.discord.activities.find((a) => a.kind === 'spotify');

    const payload = {
      success: true,
      data: {
        kv: {},
        discord_user: STATIC_DISCORD_USER,
        activities: bot.discord.activities.map(toLanyardActivity),
        discord_status: bot.discord.status,
        active_on_discord_web: false,
        active_on_discord_desktop: bot.discord.status !== 'offline',
        active_on_discord_mobile: false,
        listening_to_spotify: Boolean(spotifyItem),
        spotify: spotifyItem
          ? {
              track_id: spotifyItem.trackId,
              song: spotifyItem.name,
              artist: spotifyItem.artist,
              album: spotifyItem.album,
              album_art_url: spotifyItem.image,
              // tiempo real de inicio/fin que manda Discord para esta cancion,
              // asi el sitio sincroniza al segundo exacto en el que vas tu.
              timestamps: {
                start: spotifyItem.startMs ?? Date.now(),
                end: spotifyItem.endMs ?? Date.now() + 210000,
              },
            }
          : null,
      },
    };

    res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate=5');
    res.status(200).json(payload);
  } catch (err) {
    res.status(502).json({ success: false, error: 'activity bot unreachable' });
  }
}
