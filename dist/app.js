// Local profile adapter with public listening history from the owner's stats.fm.
import {createStatsfm, STATSFM_USER} from './statsfm.js';
import {createActivityHistory} from './activity-history.js';
const nativeFetch = window.fetch.bind(window);
const data = await nativeFetch('/data/profile.json', {cache: 'no-store'}).then(r => {
  if (!r.ok) throw new Error('Could not load profile content');
  return r.json();
});
const json = (value, status = 200) => new Response(JSON.stringify(value), {
  status, headers: { 'Content-Type': 'application/json' }
});
const loadedAt = Date.now();
// Never display a bundled activity/status as live data.
data.snapshot.presence.data = {...data.snapshot.presence.data, discord_status:'unknown',activities:[],
  listening_to_spotify:false,spotify:null,active_on_discord_web:false,active_on_discord_desktop:false,active_on_discord_mobile:false};
const history = createActivityHistory(nativeFetch, {
  getItem:key=>localStorage.getItem(key), setItem:(key,value)=>localStorage.setItem(key,value)
}, state => {
  data.snapshot.recentActivities = state.recentActivities;
  data.snapshot.gameActivity = state;
  window.__activityHistory = state.recentActivities;
  try { localStorage.setItem('cheatinformer-site-snapshot', JSON.stringify(data.snapshot)); } catch {}
  window.dispatchEvent(new CustomEvent('activity:history', {detail:state.recentActivities}));
});
data.snapshot.recentActivities = history.current().recentActivities;
data.snapshot.gameActivity = history.current();
window.__activityHistory = data.snapshot.recentActivities;
const statsfm = createStatsfm(nativeFetch, data.music);
// Only reuse history fetched from stats.fm, never the songs bundled at export time.
const listeningCacheKey = 'statsfm-recent-v1';
let lastListeningRefresh = 0;
let listeningRequest = null;
data.snapshot.recentSongs = [];
try {
  const saved = JSON.parse(localStorage.getItem(listeningCacheKey));
  if (saved?.user === STATSFM_USER && Array.isArray(saved.songs)) {
    data.snapshot.recentSongs = saved.songs.filter(song => song && typeof song.trackName === 'string' && Number.isFinite(song.listenedAt))
      .sort((a, b) => b.listenedAt - a.listenedAt).slice(0, 20);
  }
} catch {}
window.__statsfmRecentSongs = data.snapshot.recentSongs;

async function refreshListening(minGapMs = 30000) {
  if (listeningRequest) return listeningRequest;
  if (Date.now() - lastListeningRefresh < minGapMs) return data.snapshot.recentSongs;
  lastListeningRefresh = Date.now();
  listeningRequest = (async () => {
    try {
      const songs = await statsfm.recent(true);
      data.snapshot.recentSongs = songs;
      data.snapshot.updatedAt.recentSongs = songs[0]?.listenedAt ?? Date.now();
      window.__statsfmRecentSongs = songs;
      try {
        localStorage.setItem(listeningCacheKey, JSON.stringify({user: STATSFM_USER, songs}));
        localStorage.setItem('cheatinformer-site-snapshot', JSON.stringify(data.snapshot));
      } catch {}
      window.dispatchEvent(new CustomEvent('statsfm:recent-songs', {detail: songs}));
    } catch {
      // If stats.fm is unavailable, use the music recorded by the bot.
      const fallback = (await history.refresh()).recentSongs;
      if (fallback?.length && (!data.snapshot.recentSongs.length || fallback[0].listenedAt > data.snapshot.recentSongs[0].listenedAt)) {
        data.snapshot.recentSongs = fallback;
        window.__statsfmRecentSongs = fallback;
        window.dispatchEvent(new CustomEvent('statsfm:recent-songs', {detail:fallback}));
      }
    }
    return data.snapshot.recentSongs;
  })();
  try { return await listeningRequest; }
  finally { listeningRequest = null; }
}

data.snapshot.updatedAt.presence = loadedAt;
try { localStorage.setItem('cheatinformer-site-snapshot', JSON.stringify(data.snapshot)); } catch {}

// Roblox 3D avatar: the model files (OBJ, MTL, textures) are public CDN hashes listed under `avatar3d` in the data file.
// The browser downloads them once and hands the viewer blob: URLs, because textures load through <img> and cannot use the fetch shim.
const RBX_HASH = /((?:\d+DAY-)?[a-f0-9]{16,128})/i;
const rbxUrl = ref => {
  if (/^https?:\/\//i.test(ref)) return ref;
  let bucket = 31;
  for (const ch of ref) bucket ^= ch.charCodeAt(0);
  return `https://t${bucket % 8}.rbxcdn.com/${ref}`;
};
const rbxFetch = async ref => {
  const response = await nativeFetch(rbxUrl(ref));
  if (!response.ok) throw new Error(`Roblox CDN ${response.status}`);
  return response;
};
const rbxBlobs = new Map();
const rbxBlobUrl = ref => {
  const hash = String(ref).match(RBX_HASH)?.[1];
  if (!hash) return Promise.reject(new Error('Not a Roblox asset reference'));
  if (!rbxBlobs.has(hash)) rbxBlobs.set(hash, rbxFetch(hash).then(r => r.blob()).then(b => URL.createObjectURL(b)));
  return rbxBlobs.get(hash);
};
let avatar3dPromise = null;
function loadAvatar3d(model) {
  // Cached on purpose: the card asks twice and remounts the viewer if the payload changes.
  avatar3dPromise ??= (async () => {
    const [objUrl, mtl] = await Promise.all([rbxBlobUrl(model.obj), rbxFetch(model.mtl).then(r => r.text())]);
    const refs = [...new Set([...mtl.matchAll(/^\s*map_kd\s+(\S+)/gim)].map(m => m[1]))];
    const resolved = new Map();
    await Promise.all(refs.map(async ref => { try { resolved.set(ref, await rbxBlobUrl(ref)); } catch {} }));
    // Keep map_Kd lines only when they resolved; otherwise the viewer falls back to the ordered `textures` list.
    const mtlText = resolved.size
      ? mtl.replace(/^(\s*map_kd\s+)(\S+)/gim, (line, lead, ref) => resolved.has(ref) ? lead + resolved.get(ref) : '')
      : mtl.replace(/^\s*map_kd\s+\S+.*$/gim, '');
    const textures = await Promise.all((model.textures || []).map(ref => rbxBlobUrl(ref).catch(() => null)));
    return { targetId: model.targetId, version: model.version, obj: model.obj, objUrl, mtl: model.mtl, mtlText,
             textures: textures.map(t => t || ''), fetchedAt: Date.now(), assetProxyVersion: 14 };
  })().catch(error => { avatar3dPromise = null; throw error; });
  return avatar3dPromise;
}

window.fetch = async (input, options) => {
  const url = new URL(typeof input === 'string' ? input : input.url || String(input), location.href);
  if (!url.pathname.startsWith('/.netlify/functions/')) return nativeFetch(input, options);
  const endpoint = url.pathname.split('/').pop();
  switch (endpoint) {
    case 'getSiteSnapshot': return json(data.snapshot);
    case 'getLanyardPresence': {
      try {
        const r = await nativeFetch('/api/presence', {cache: 'no-store'});
        if (r.ok) {
          const presence = await r.json();
          data.snapshot.presence = presence;
          return json(presence);
        }
      } catch {}
      return json({...data.snapshot.presence,data:{...data.snapshot.presence.data,discord_status:'unknown',activities:[],listening_to_spotify:false,spotify:null,active_on_discord_web:false,active_on_discord_desktop:false,active_on_discord_mobile:false}});
    }
    case 'recentActivity': return json((await history.refresh()).recentActivities);
    case 'recentSongs': return json(await refreshListening());
    case 'getDiscordGameActivity': return json(await history.refresh());
    case 'getGameInfo': return json(data.snapshot.gameInfo);
    case 'getGithubContributions': return json(data.github);
    case 'getRobloxAvatar3d': {
      if (!data.avatar3d) return json({error:'3D preview unavailable'}, 503);
      try { return json(await loadAvatar3d(data.avatar3d)); }
      catch (error) { return json({error:`3D preview unavailable (${error.message})`}, 503); }
    }
    case 'getRobloxGameSummary': return json(data.robloxGame);
    case 'views': return json({ views: data.views });
    case 'getStatsfmMusic': {
      const range = url.searchParams.get('range') || 'weeks';
      try { return json(await statsfm.music(range, url.searchParams.get('refresh') === '1')); }
      catch (error) { return json({success:false, message:error.message}, 503); }
    }
    case 'getYoutubeVideo': {
      const query = (url.searchParams.get('track') || url.searchParams.get('query') || '').toLowerCase();
      const song = data.snapshot.recentSongs.find(s => query.includes(s.trackName.toLowerCase()) || s.trackName.toLowerCase().includes(query));
      const id = song?.youtubeUrl?.split('v=')[1];
      return json(id ? {videoId:id, url:song.youtubeUrl, candidates:[{videoId:id,url:song.youtubeUrl}]} : {candidates:[]});
    }
    case 'getSpotifyLyrics': return json({lines:[],synced:false});
    case 'getSpotifyCanvas': return json({canvasUrl:null});
    case 'getSpotifyAudioState': return json({isPlaying:false});
    default: return json({error:'This integration is not connected in the recreation'},404);
  }
};

// Start the request before the interface loads, including while the entry screen is visible.
void history.refresh(true);
void refreshListening(0);
await import('/assets/index-D_CJfPsU.js');
setInterval(() => { if (!document.hidden) void refreshListening(); }, 30000);
setInterval(() => { if (!document.hidden) void history.refresh(); }, 15000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) {void refreshListening();void history.refresh();} });
window.addEventListener('online', () => void refreshListening(0));

// Standard keyboard dismissal and focus restoration for the original dialogs.
let previousFocus = null;
const dialogs = new MutationObserver(() => {
  const dialog = document.querySelector('[role="dialog"]');
  if (dialog && !dialog.dataset.focusManaged) {
    previousFocus = document.activeElement;
    dialog.dataset.focusManaged = 'true';
    const close = dialog.querySelector('button[aria-label^="Close"]');
    close?.focus({preventScroll:true});
  }
});
dialogs.observe(document.body, {childList:true, subtree:true});
document.addEventListener('keydown', event => {
  const dialog = [...document.querySelectorAll('[role="dialog"]')].pop();
  if (!dialog) return;
  if (event.key === 'Escape') {
    dialog.querySelector('button[aria-label^="Close"]')?.click();
    previousFocus?.focus({preventScroll:true});
  }
  if (event.key === 'Tab') {
    const elements = [...dialog.querySelectorAll('button:not([disabled]), a[href], input, [tabindex="0"]')].filter(e=>e.getClientRects().length);
    const first = elements[0], last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) {event.preventDefault();last?.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first?.focus();}
  }
});
