export const nativeFetch = globalThis.fetch.bind(globalThis);

export async function requestJson(url, options = {}) {
  const response = await nativeFetch(url, { signal: AbortSignal.timeout(10000), ...options });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

export function readStored(key, fallback = null) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function storeValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage can be unavailable in private browsing. */
  }
}
