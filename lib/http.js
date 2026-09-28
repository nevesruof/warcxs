const cache = new Map();
const pending = new Map();

export async function cached(key, ttl, load) {
  const saved = cache.get(key);
  if (saved && saved.expires > Date.now()) return saved.value;
  if (pending.has(key)) return pending.get(key);
  const task = Promise.resolve()
    .then(load)
    .then((value) => {
      if (cache.size >= 200) cache.delete(cache.keys().next().value);
      cache.set(key, { value, expires: Date.now() + ttl });
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

export function endpoint(load, { maxAge = 0 } = {}) {
  return async (req, res) => {
    res.setHeader('Cache-Control', maxAge ? `public, s-maxage=${maxAge}` : 'no-store');
    if (req.method && req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'GET only' });
    }
    try {
      return res.status(200).json(await load(new URL(req.url, 'http://localhost').searchParams));
    } catch (error) {
      const status = error.status === 400 ? 400 : 503;
      return res
        .status(status)
        .json({ error: status === 400 ? error.message : 'Service temporarily unavailable' });
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
