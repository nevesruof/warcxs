export const USER_ID = '1239908273885286546';
export const activityType = item => Number.isInteger(item.type) ? item.type :
  ({playing:0,streaming:1,listening:2,watching:3,custom:4,competing:5,spotify:2}[String(item.kind).toLowerCase()] ?? 0);
const ms = value => Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) * 1000 : null;
export async function readBot() {
  const url = process.env.ACTIVITY_BOT_URL || 'http://fi12.bot-hosting.cloud:25545/api/activity';
  const headers = process.env.ACTIVITY_BOT_TOKEN ? {Authorization: `Bearer ${process.env.ACTIVITY_BOT_TOKEN}`} : {};
  const response = await fetch(url, {headers, cache:'no-store', signal:AbortSignal.timeout(8000)});
  if (!response.ok) throw new Error(`Activity service ${response.status}`);
  const bot = await response.json();
  if (String(bot.discordUserId) !== USER_ID || !Array.isArray(bot.discord?.activities) || !Array.isArray(bot.recentActivities))
    throw new Error('Unexpected activity payload');
  return bot;
}
export function historyPayload(bot) {
  const recentActivities = bot.recentActivities.filter(a => a.name && a.kind !== 'spotify' && activityType(a) !== 4)
    .map(a => ({id:`discord:${a.sessionId ?? a.name + ':' + a.firstSeen}`,name:a.name,type:activityType(a),
      applicationId:a.applicationId ? String(a.applicationId) : undefined,details:a.details,state:a.state,
      largeImage:a.image,largeText:a.largeText,startedAt:a.startMs || ms(a.firstSeen),lastSeenAt:ms(a.lastSeen),active:!!a.active}))
    .filter(a => a.lastSeenAt).sort((a,b) => b.lastSeenAt-a.lastSeenAt);
  return {userId:USER_ID,source:'bot',recentActivities,
    activities:recentActivities.filter(a=>a.type===0).map(a=>({...a,
      startedAt:new Date(a.startedAt || a.lastSeenAt).toISOString(),lastSeenAt:new Date(a.lastSeenAt).toISOString()})),
    recentSongs:(bot.recentSongs || bot.recentActivities.filter(a=>a.kind==='spotify')).map(a=>({
      id:`discord-song:${a.sessionId}`,trackName:a.name,artistName:a.artist || '',albumName:a.album || '',
      albumArtUrl:a.image || null,listenedAt:ms(a.lastSeen),durationMs:a.endMs&&a.startMs?a.endMs-a.startMs:null,
      spotifyUrl:a.url || null,youtubeUrl:null,tags:[]
    })).filter(a=>a.trackName&&a.listenedAt).sort((a,b)=>b.listenedAt-a.listenedAt).slice(0,20),
    roblox:bot.roblox,recentRobloxGames:bot.recentRobloxGames || [],generatedAt:bot.generatedAt};
}
export function presencePayload(bot, user) {
  const live=bot.discord;
  const fresh=live.connected !== false && Date.now()-(ms(live.updatedAt)||0)<120000;
  const status=fresh && ['online','idle','dnd','offline'].includes(live.status)?live.status:'unknown';
  const items=fresh&&status!=='offline'?live.activities:[];
  const spotify=items.find(a=>a.kind==='spotify');
  return {success:true,data:{kv:{},discord_user:user,discord_status:status,
    active_on_discord_web:fresh&&live.webStatus!=null&&live.webStatus!=='offline',
    active_on_discord_desktop:fresh&&live.desktopStatus!=null&&live.desktopStatus!=='offline',
    active_on_discord_mobile:fresh&&live.mobileStatus!=null&&live.mobileStatus!=='offline',
    activities:items.map(a=>({id:a.key || a.applicationId || a.trackId || a.name,name:a.kind==='spotify'?'Spotify':a.name,
      type:activityType(a),application_id:a.applicationId ? String(a.applicationId):undefined,
      details:a.kind==='spotify'?a.name:a.details,state:a.kind==='spotify'?a.artist:a.state,
      assets:a.image?{large_image:a.image,large_text:a.album || a.largeText}:undefined,
      timestamps:a.startMs?{start:a.startMs,...(a.endMs?{end:a.endMs}:{})}:undefined,sync_id:a.trackId})),
    listening_to_spotify:!!spotify,
    spotify:spotify?{track_id:spotify.trackId,song:spotify.name,artist:spotify.artist,album:spotify.album,
      album_art_url:spotify.image,timestamps:{start:spotify.startMs,end:spotify.endMs}}:null}};
}
