import { createStatsfm, STATSFM_USER } from './statsfm.js';
import { createActivityHistory } from './activity-history.js';
import { nativeFetch, requestJson, readStored, storeValue } from './request.js';
import { loadAvatar3d } from './roblox-avatar.js';
import { updateAudioPresence } from './audio.js';

const MUSIC_CACHE = 'statsfm-recent-v2';
const SNAPSHOT_CACHE = 'cheatinformer-site-snapshot';
const ROBLOX_CACHE = 'warcxs:last-roblox-game:zahidtql12';
const statsfm = createStatsfm(nativeFetch);
let data;
let history;
let listeningRequest;
let listeningChecked = 0;
let robloxChecked = 0;
let robloxRequest;
let presenceRequest;
let presenceChecked = 0;

function refreshPresence() {
  if (presenceRequest) return presenceRequest;
  if (Date.now() - presenceChecked < 4000) return Promise.resolve(data.snapshot.presence);
  presenceRequest = requestJson('/api/presence')
    .catch(offlinePresence)
    .then((presence) => {
      data.snapshot.presence = presence;
      data.snapshot.updatedAt.presence = Date.now();
      presenceChecked = Date.now();
      updateAudioPresence(presence.data);
      publishSnapshot();
      return presence;
    })
    .finally(() => {
      presenceRequest = null;
    });
  return presenceRequest;
}

function publishSnapshot() {
  storeValue(SNAPSHOT_CACHE, data.snapshot);
}

function publishSongs(songs) {
  data.snapshot.recentSongs = songs;
  data.snapshot.updatedAt.recentSongs = Date.now();
  window.__statsfmRecentSongs = songs;
  storeValue(MUSIC_CACHE, { user: STATSFM_USER, songs });
  publishSnapshot();
  window.dispatchEvent(new CustomEvent('statsfm:recent-songs', { detail: songs }));
}

async function refreshListening(force = false) {
  if (listeningRequest) return listeningRequest;
  if (!force && Date.now() - listeningChecked < 30000) return data.snapshot.recentSongs;
  listeningChecked = Date.now();
  listeningRequest = statsfm
    .recent(true)
    .then(publishSongs)
    .catch(async () => {
      const fallback = (await history.refresh()).recentSongs;
      if (
        fallback?.length &&
        (!data.snapshot.recentSongs.length ||
          fallback[0].listenedAt > data.snapshot.recentSongs[0].listenedAt)
      )
        publishSongs(fallback);
    })
    .then(() => data.snapshot.recentSongs)
    .finally(() => {
      listeningRequest = null;
    });
  return listeningRequest;
}

async function refreshRoblox() {
  if (robloxRequest) return robloxRequest;
  if (Date.now() - robloxChecked < 15000) return data.snapshot.robloxProfile;
  robloxChecked = Date.now();
  robloxRequest = requestJson('/api/roblox')
    .then((profile) => {
      if (profile.lastPlayedGame) storeValue(ROBLOX_CACHE, profile.lastPlayedGame);
      data.snapshot.robloxProfile = {
        ...data.snapshot.robloxProfile,
        ...profile,
        lastPlayedGame: profile.lastPlayedGame || readStored(ROBLOX_CACHE),
      };
      publishSnapshot();
      window.dispatchEvent(
        new CustomEvent('profile:updated', {
          detail: {
            profile: data.snapshot.profile,
            robloxProfile: data.snapshot.robloxProfile,
          },
        }),
      );
      return data.snapshot.robloxProfile;
    })
    .catch(() => data.snapshot.robloxProfile)
    .finally(() => {
      robloxRequest = null;
    });
  return robloxRequest;
}

function offlinePresence() {
  return {
    success: true,
    data: {
      discord_user: data.snapshot.presence.data.discord_user,
      discord_status: 'unknown',
      activities: [],
      listening_to_spotify: false,
      spotify: null,
      active_on_discord_web: false,
      active_on_discord_desktop: false,
      active_on_discord_mobile: false,
    },
  };
}

const routes = {
  getSiteSnapshot: () => data.snapshot,
  getLanyardPresence: refreshPresence,
  recentActivity: async () => (await history.refresh()).recentActivities,
  recentSongs: () => refreshListening(),
  getDiscordGameActivity: () => history.refresh(),
  getGameInfo: () => data.snapshot.gameInfo,
  getGithubContributions: () => data.github,
  getRobloxAvatar3d: () => loadAvatar3d(data.avatar3d),
  getRobloxGameSummary: (params) => requestJson(`/api/roblox?${params}`),
  views: () => ({ views: data.views }),
  getStatsfmMusic: (params) =>
    statsfm.music(params.get('range') || 'weeks', params.get('refresh') === '1'),
  getStatsfmAlbums: (params) =>
    statsfm.albums(params.get('range') || 'weeks', params.get('refresh') === '1'),
  getYoutubeVideo: (params) => requestJson(`/api/playback?${params}`),
  getSpotifyLyrics: (params) => requestJson(`/api/lyrics?${params}`),
};

// Only the retained interface uses this adapter; global fetch remains untouched.
export async function profileFetch(input, options) {
  const url = new URL(
    typeof input === 'string' ? input : input.url || String(input),
    location.href,
  );
  if (url.origin !== location.origin || !url.pathname.startsWith('/.netlify/functions/'))
    return nativeFetch(input, options);
  const route = routes[url.pathname.split('/').pop()];
  if (!route) return Response.json({ error: 'Unknown endpoint' }, { status: 404 });
  try {
    return Response.json(await route(url.searchParams));
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 503 });
  }
}

export async function initializeProfile() {
  data = await requestJson('/data/profile.json');
  data.snapshot.presence = offlinePresence();
  void refreshPresence();
  const music = readStored(MUSIC_CACHE);
  data.snapshot.recentSongs =
    music?.user === STATSFM_USER && Array.isArray(music.songs) ? music.songs.slice(0, 20) : [];
  data.snapshot.robloxProfile.lastPlayedGame = readStored(ROBLOX_CACHE);
  window.__statsfmRecentSongs = data.snapshot.recentSongs;
  history = createActivityHistory(
    nativeFetch,
    {
      getItem: (key) => localStorage.getItem(key),
      setItem: (key, value) => localStorage.setItem(key, value),
    },
    (state) => {
      data.snapshot.recentActivities = state.recentActivities;
      data.snapshot.gameActivity = state;
      window.__activityHistory = state.recentActivities;
      publishSnapshot();
      window.dispatchEvent(new CustomEvent('activity:history', { detail: state.recentActivities }));
    },
  );
  data.snapshot.recentActivities = history.current().recentActivities;
  data.snapshot.gameActivity = history.current();
  publishSnapshot();
  const refresh = () => {
    if (document.hidden) return;
    void history.refresh();
    void refreshListening();
    void refreshRoblox();
  };
  refresh();
  const timer = setInterval(refresh, 15000);
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('online', refresh);
  window.addEventListener('pagehide', () => clearInterval(timer), {
    once: true,
  });
}
