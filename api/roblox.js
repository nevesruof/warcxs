import { endpoint, rateLimit } from '../lib/http.js';
import { readBot } from '../lib/activity.js';
import { readRoblox, gameSummary } from '../lib/roblox.js';

export default endpoint(
  async (params, req) => {
    if (params.has('universeId')) {
      // Arbitrary ids are proxied to Roblox; keep one client from sweeping them.
      rateLimit(req, 'roblox-game', 30);
      return gameSummary(Number(params.get('universeId')));
    }
    return readRoblox(await readBot().catch(() => null));
  },
  { maxAge: 10, staleWhileRevalidate: 30 },
);
