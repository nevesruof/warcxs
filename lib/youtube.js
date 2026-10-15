// Finds embeddable YouTube videos for a song.
//
// 1. YouTube Data API v3 (needs YOUTUBE_API_KEY, 100 quota units per search,
//    10,000/day by default, so roughly 100 distinct songs a day).
// 2. When the key is missing, rejected or out of quota, fall back to reading
//    the public search results page. That is not an official API: set
//    YOUTUBE_SCRAPE_FALLBACK=off to disable it.
// Every result carries a `reason` when nothing was found so the cause is visible.

const ID = /^[\w-]{11}$/;

export function apiFailureReason(status, body) {
  const reasons = (body?.error?.errors || []).map((entry) => entry.reason);
  const message = String(body?.error?.message || '');
  if (
    reasons.some((r) => ['quotaExceeded', 'dailyLimitExceeded', 'rateLimitExceeded'].includes(r)) ||
    /quota/i.test(message)
  )
    return 'youtube-quota-exceeded';
  if (
    reasons.some((r) => ['keyInvalid', 'accessNotConfigured', 'forbidden', 'ipRefererBlocked'].includes(r)) ||
    status === 400 ||
    status === 401 ||
    status === 403
  )
    return 'youtube-key-rejected';
  return 'youtube-error';
}

async function apiSearch(query, apiKey, fetchImpl) {
  const params = new URLSearchParams({
    key: apiKey,
    part: 'snippet',
    type: 'video',
    videoEmbeddable: 'true',
    videoSyndicated: 'true',
    maxResults: '5',
    q: query,
  });
  let response;
  try {
    response = await fetchImpl(`https://www.googleapis.com/youtube/v3/search?${params}`, {
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return { videoIds: [], reason: 'youtube-unreachable' };
  }
  const body = await response.json().catch(() => null);
  if (!response.ok) return { videoIds: [], reason: apiFailureReason(response.status, body) };
  const videoIds = (Array.isArray(body?.items) ? body.items : [])
    .map((item) => item.id?.videoId)
    .filter((id) => ID.test(id || ''));
  return { videoIds, source: 'youtube-api' };
}

export function parseSearchPage(html) {
  const ids = [];
  for (const match of String(html).matchAll(/"videoRenderer":\{"videoId":"([\w-]{11})"/g))
    if (!ids.includes(match[1])) ids.push(match[1]);
  return ids.slice(0, 5);
}

async function scrapeSearch(query, fetchImpl) {
  try {
    const response = await fetchImpl(
      `https://www.youtube.com/results?${new URLSearchParams({ search_query: query, sp: 'EgIQAQ==' })}`,
      {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9',
          // Skips the EU consent interstitial, which has no results in it.
          Cookie: 'CONSENT=YES+1; SOCS=CAI',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) return { videoIds: [], reason: 'youtube-scrape-failed' };
    const videoIds = parseSearchPage(await response.text());
    return videoIds.length
      ? { videoIds, source: 'youtube-scrape' }
      : { videoIds: [], reason: 'youtube-scrape-empty' };
  } catch {
    return { videoIds: [], reason: 'youtube-scrape-failed' };
  }
}

export async function findVideos(
  { track, artist },
  { apiKey = process.env.YOUTUBE_API_KEY?.trim(), scrape = process.env.YOUTUBE_SCRAPE_FALLBACK, fetchImpl = fetch } = {},
) {
  const query = `${artist} ${track} official audio`;
  let outcome = apiKey
    ? await apiSearch(query, apiKey, fetchImpl)
    : { videoIds: [], reason: 'youtube-not-configured' };
  // A key problem or exhausted quota is worth falling back from; an API that
  // simply found nothing is not.
  const apiFailed = !outcome.videoIds.length && outcome.reason;
  if (apiFailed && String(scrape || '').toLowerCase() !== 'off') {
    const fallback = await scrapeSearch(query, fetchImpl);
    if (fallback.videoIds.length) outcome = { ...fallback, apiReason: outcome.reason };
  }
  const { videoIds } = outcome;
  return {
    videoIds,
    videoId: videoIds[0] || null,
    available: videoIds.length > 0,
    source: outcome.source,
    reason: videoIds.length ? undefined : outcome.reason || 'no-results',
    apiReason: outcome.apiReason,
  };
}
