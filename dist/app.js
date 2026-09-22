// Local profile adapter with public listening history from the owner's stats.fm.
import {createStatsfm} from './statsfm.js';
const nativeFetch = window.fetch.bind(window);
const data = await nativeFetch('/data/profile.json').then(r => {
  if (!r.ok) throw new Error('Could not load profile content');
  return r.json();
});
const json = (value, status = 200) => new Response(JSON.stringify(value), {
  status, headers: { 'Content-Type': 'application/json' }
});
// Keep relative labels at the recorded values without claiming a live feed.
const loadedAt = Date.now();
data.snapshot.recentActivities.forEach(item => {
  item.lastSeenAt = loadedAt - item.recordedHoursAgo * 3600000;
  item.startedAt = item.lastSeenAt - 3600000;
});
const statsfm = createStatsfm(nativeFetch, data.music);
window.__statsfmRecentSongs = data.snapshot.recentSongs;
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
    case 'getLanyardPresence': return json(data.snapshot.presence);
    case 'recentActivity': return json(data.snapshot.recentActivities);
    case 'recentSongs': return json(data.snapshot.recentSongs);
    case 'getDiscordGameActivity': return json(data.snapshot.gameActivity);
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

await import('/assets/index-D_CJfPsU.js');

let lastListeningRefresh = 0;
async function refreshListening(minGapMs = 0) {
  if (document.hidden || Date.now() - lastListeningRefresh < minGapMs) return;
  try {
    // force = true skips the 5-minute response cache; otherwise every second tick was answered from cache.
    const songs = await statsfm.recent(true);
    lastListeningRefresh = Date.now();
    data.snapshot.recentSongs = songs;
    data.snapshot.updatedAt.recentSongs = songs[0]?.listenedAt ?? Date.now();
    window.__statsfmRecentSongs = songs;
    try { localStorage.setItem('cheatinformer-site-snapshot', JSON.stringify(data.snapshot)); } catch {}
    window.dispatchEvent(new CustomEvent('statsfm:recent-songs', {detail: songs}));
  } catch {
    // Keep the last successful history with its original timestamps.
  }
}
void refreshListening();
setInterval(() => void refreshListening(), 5 * 60 * 1000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) void refreshListening(30 * 1000); });

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
