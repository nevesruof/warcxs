// Public stats.fm data. No Spotify or Discord credentials are needed here.
export const STATSFM_USER = '31esju7gpv3nvyqglogd3mqyczd4';
export const STATSFM_URL = `https://stats.fm/${STATSFM_USER}`;
const API = `https://api.stats.fm/api/v1/users/${STATSFM_USER}`;
const CACHE_MS = 5 * 60 * 1000;
const labels = {
  weeks: 'last 4 weeks',
  months: 'last 6 months',
  current_year: 'this year',
  lifetime: 'lifetime',
};
const formatter = new Intl.NumberFormat('en', { maximumFractionDigits: 0 });
const number = (value) => (Number.isFinite(value) ? formatter.format(value) : '—');
const spotify = (item, type = 'track') => {
  const id = item?.externalIds?.spotify?.[0];
  return typeof id === 'string' && /^[A-Za-z0-9]+$/.test(id)
    ? `https://open.spotify.com/${type}/${id}`
    : null;
};

export function normalizeRecent(payload) {
  if (!Array.isArray(payload?.items)) throw new Error('Recent listening history is unavailable.');
  return payload.items
    .filter((item) => item?.track?.name && Number.isFinite(Date.parse(item.endTime)))
    .sort((a, b) => Date.parse(b.endTime) - Date.parse(a.endTime))
    .slice(0, 20)
    .map((item, index) => ({
      id: `statsfm:${item.track.id}:${item.endTime}:${index}`,
      trackName: item.track.name,
      artistName: (item.track.artists || []).map((artist) => artist.name).join(', '),
      albumName: item.track.albums?.[0]?.name || '',
      albumArtUrl: item.track.albums?.[0]?.image || null,
      listenedAt: Date.parse(item.endTime),
      durationMs: item.track.durationMs || null,
      spotifyUrl: spotify(item.track),
      youtubeUrl: null,
      tags: [],
    }));
}

export function normalizeMusic(profile, range, tracks, artists, albums, stats, dates) {
  const totals = stats?.items;
  const duration = totals?.durationMs;
  const normalizeTop = (payload, kind) =>
    (Array.isArray(payload?.items) ? payload.items : [])
      .slice(0, 100)
      .map((row, index) => {
        const item = row[kind];
        if (!item?.name) return null;
        return {
          id: String(item.id),
          rank: row.position || index + 1,
          name: item.name,
          artists: (item.artists || []).map((artist) => artist.name),
          album: item.albums?.[0]?.name || '',
          image: item.image || item.albums?.[0]?.image || null,
          streams: Number.isFinite(row.streams?.count)
            ? row.streams.count
            : Number.isFinite(row.streams)
              ? row.streams
              : null,
          minutes: Number.isFinite(row.streams?.durationMs)
            ? Math.round(row.streams.durationMs / 60000)
            : null,
          spotifyUrl: spotify(item, kind),
        };
      })
      .filter(Boolean);
  return {
    success: true,
    fetchedAt: Date.now(),
    sourceUrl: STATSFM_URL,
    profile: {
      displayName: profile.displayName || 'wArcxs',
      handle: profile.displayName || 'wArcxs',
      image: profile.image || null,
    },
    range: { id: range, label: labels[range] },
    totals: {
      streams: number(totals?.count),
      minutesText: number(Number.isFinite(duration) ? duration / 60000 : null),
      hoursText: number(Number.isFinite(duration) ? duration / 3600000 : null),
      uniqueTracksText: number(totals?.cardinality?.tracks),
      albumsText: number(totals?.cardinality?.albums),
      artistsText: number(totals?.cardinality?.artists),
      dailyAverageText: '—',
    },
    topTracks: normalizeTop(tracks, 'track'),
    topArtists: normalizeTop(artists, 'artist'),
    topAlbums: normalizeTop(albums, 'album'),
    clock: normalizeClock(dates),
  };
}

export function createStatsfm(fetcher) {
  const cache = new Map();
  const pending = new Map();
  const dashboardCache = new Map();
  const dashboardPending = new Map();
  async function request(path, force = false) {
    const saved = cache.get(path);
    if (!force && saved && Date.now() - saved.at < CACHE_MS) return saved.value;
    if (pending.has(path)) return pending.get(path);
    const job = (async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      try {
        const response = await fetcher(`${API}${path}`, {
          signal: controller.signal,
          credentials: 'omit',
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('stats.fm is not sharing this data right now.');
        const value = await response.json();
        cache.set(path, { value, at: Date.now() });
        return value;
      } finally {
        clearTimeout(timeout);
      }
    })();
    pending.set(path, job);
    try {
      return await job;
    } finally {
      pending.delete(path);
    }
  }
  async function dashboard(key, force, load) {
    const saved = dashboardCache.get(key);
    if (!force && saved && Date.now() - saved.at < CACHE_MS) return saved.value;
    if (dashboardPending.has(key)) return dashboardPending.get(key);
    const job = Promise.resolve(load())
      .then((value) => {
        dashboardCache.set(key, { value, at: Date.now() });
        return value;
      })
      .finally(() => dashboardPending.delete(key));
    dashboardPending.set(key, job);
    return job;
  }
  return {
    recent: async (force = false) =>
      normalizeRecent(await request('/streams/recent?limit=20', force)),
    async albums(range = 'weeks', force = false) {
      const albums = await request(
        `/top/albums?${rangeQuery(range)}&orderBy=COUNT&limit=100`,
        force,
      );
      return normalizeMusic({}, range, null, null, albums, null).topAlbums;
    },
    music(range = 'weeks', force = false) {
      return dashboard(`music:${range}`, force, async () => {
      const query = rangeQuery(range);
      const timezone = encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone);
      const responses = await Promise.allSettled([
        request('', force),
        request(`/top/tracks?${query}&orderBy=SPOTIFY&limit=100`, force),
        request(`/top/artists?${query}&orderBy=SPOTIFY&limit=100`, force),
        request(`/streams/stats?${query}`, force),
        request(`/streams/stats/dates?${query}&timeZone=${timezone}`, force),
      ]);
      const [profile, tracks, artists, stats, dates] = responses.map((result) =>
        result.status === 'fulfilled' ? result.value : null,
      );
      if (!tracks && !artists && !stats)
        throw new Error('Music statistics are temporarily unavailable.');
      const result = normalizeMusic(
        profile?.item || {},
        range,
        tracks,
        artists,
        null,
        stats,
        dates,
      );
      result.clock.available = Boolean(dates);
      return result;
      });
    },
  };
}

export function rangeQuery(range, now = Date.now()) {
  if (!labels[range]) throw new Error('Unknown listening period.');
  if (range === 'current_year')
    return `after=${Date.UTC(new Date(now).getUTCFullYear(), 0, 1)}&before=${now}`;
  return `range=${encodeURIComponent(range)}`;
}

export function normalizeClock(payload) {
  const dates = payload?.items;
  const hours = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    count: Math.max(0, Number(dates?.hours?.[hour]?.count) || 0),
    minutes: Math.max(0, Number(dates?.hours?.[hour]?.durationMs) || 0) / 60000,
  }));
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label, day) => ({
    day,
    label,
    count: Math.max(0, Number(dates?.weekDays?.[day]?.count) || 0),
  }));
  const maxCount = Math.max(1, ...hours.map((item) => item.count));
  const maxMinutes = Math.max(1, ...hours.map((item) => item.minutes));
  const maxDay = Math.max(1, ...weekdays.map((item) => item.count));
  return {
    sourceCount: hours.reduce((total, item) => total + item.count, 0),
    hours: hours.map((item) => ({
      ...item,
      share: item.count / maxCount,
      minutesShare: item.minutes / maxMinutes,
    })),
    weekdays: weekdays.map((item) => ({ ...item, share: item.count / maxDay })),
    peakHour: hours.reduce((peak, item) => (item.count > peak.count ? item : peak), hours[0]),
  };
}
