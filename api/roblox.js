import { endpoint } from '../lib/http.js';
import { readBot } from '../lib/activity.js';
import { readRoblox, gameSummary } from '../lib/roblox.js';

export default endpoint(async (params) => {
  if (params.has('universeId')) return gameSummary(Number(params.get('universeId')));
  return readRoblox(await readBot().catch(() => null));
});
