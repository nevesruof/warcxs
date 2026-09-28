const KEY = 'warcxs-activity-history:v1:1239908273885286546';
export function createActivityHistory(fetcher, storage, publish) {
  let state = {
    userId: '1239908273885286546',
    source: 'cache',
    recentActivities: [],
    activities: [],
    recentSongs: [],
  };
  let pending = null,
    checkedAt = 0;
  const valid = (v) =>
    v?.userId === state.userId && Array.isArray(v.recentActivities) && Array.isArray(v.activities);
  try {
    const saved = JSON.parse(storage.getItem(KEY));
    if (valid(saved)) state = saved;
  } catch {}
  return {
    current: () => state,
    async refresh(force = false) {
      if (pending) return pending;
      if (!force && Date.now() - checkedAt < 10000) return state;
      checkedAt = Date.now();
      pending = (async () => {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 12000);
          let next;
          try {
            const response = await fetcher('/api/game-activity', {
              cache: 'no-store',
              signal: controller.signal,
            });
            if (!response.ok) throw Error('History unavailable');
            next = await response.json();
          } finally {
            clearTimeout(timer);
          }
          if (!valid(next)) throw Error('Invalid history');
          // An empty/reset remote database must not erase this browser's known history.
          const merged = new Map(state.recentActivities.map((a) => [a.id, a]));
          for (const activity of next.recentActivities) merged.set(activity.id, activity);
          state = {
            ...next,
            recentActivities: [...merged.values()]
              .filter((a) => a.name && Number.isFinite(a.lastSeenAt))
              .sort((a, b) => b.lastSeenAt - a.lastSeenAt)
              .slice(0, 500),
          };
          try {
            storage.setItem(KEY, JSON.stringify(state));
          } catch {}
          publish(state);
        } catch {
          /* A transport error is not an empty history. */
        }
        return state;
      })();
      try {
        return await pending;
      } finally {
        pending = null;
      }
    },
  };
}
