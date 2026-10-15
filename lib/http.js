const cache = new Map();
const pending = new Map();
const hits = new Map();

// Short CDN cache for live data: every visitor polls every few seconds, so
// letting the CDN absorb them means one origin hit (and one request to the
// bot) per window instead of one per visitor.
export const LIVE_CACHE = 'public, s-maxage=5, stale-while-revalidate=15';

export async function cached(key, ttl, load) {
  const saved = cache.get(key);
  if (saved && saved.expires > Date.now()) return saved.value;
  if (pending.has(key)) return pending.get(key);
  const task = Promise.resolve()
    .then(load)
    .then((value) => {
      if (cache.size >= 200) cache.delete(cache.keys().next().value);
      cache.set(key, { value, expires: Date.now() + (typeof ttl === 'function' ? ttl(value) : ttl) });
      return value;
    })
    .finally(() => pending.delete(key));
  pending.set(key, task);
  return task;
}

export async function fetchJson(url, options = {}) {
  const response = await fetch(url, { signal: AbortSignal.timeout(8000), ...options });
  if (!response.ok) {
    const error = new Error(`Upstream returned ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// Best-effort limiter kept in memory. Serverless instances do not share it, so
// it only stops one client from hammering one instance; use Vercel's WAF rate
// limiting for a hard global cap. Call it only where work is actually done
// (e.g. inside a `cached` loader) so repeated cache hits stay free.
export function rateLimit(req, scope, limit, windowMs = 60000) {
  const header =
    req?.headers?.['x-real-ip'] || req?.headers?.['x-forwarded-for'] || req?.socket?.remoteAddress;
  const ip = String(header || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const key = `${scope}:${ip}`;
  const entry = hits.get(key);
  if (!entry || entry.reset <= now) {
    if (hits.size >= 5000) {
      for (const [saved, value] of hits) if (value.reset <= now) hits.delete(saved);
      if (hits.size >= 5000) hits.clear();
    }
    hits.set(key, { count: 1, reset: now + windowMs });
    return;
  }
  if (++entry.count > limit) {
    const error = new Error('Too many requests');
    error.status = 429;
    error.expose = true;
    error.retryAfter = Math.max(1, Math.ceil((entry.reset - now) / 1000));
    throw error;
  }
}

export function endpoint(load, { maxAge = 0, staleWhileRevalidate = 0 } = {}) {
  const cacheControl = maxAge
    ? `public, s-maxage=${maxAge}${staleWhileRevalidate ? `, stale-while-revalidate=${staleWhileRevalidate}` : ''}`
    : 'no-store';
  return async (req, res) => {
    res.setHeader('Cache-Control', cacheControl);
    if (req.method && req.method !== 'GET') {
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'GET only' });
    }
    try {
      return res.status(200).json(await load(new URL(req.url, 'http://localhost').searchParams, req, res));
    } catch (error) {
      // A failure must never be kept by the CDN for the success TTL.
      res.setHeader('Cache-Control', 'no-store');
      if (error.retryAfter) res.setHeader('Retry-After', String(error.retryAfter));
      const status = error.expose || error.status === 400 ? error.status : 503;
      return res
        .status(status)
        .json({ error: status === 503 ? 'Service temporarily unavailable' : error.message });
    }
  };
}

export function requiredText(params, key) {
  const text = params.get(key)?.trim();
  if (!text || text.length > 240) {
    const error = new Error(`Invalid ${key}`);
    error.status = 400;
    throw error;
  }
  return text;
}
