// Client for /api/guestbook.
const URL_ = "/api/guestbook";

export async function loadGuestbook(fetchImpl = fetch) {
  try {
    const response = await fetchImpl(URL_, { headers: { Accept: "application/json" } });
    if (!response.ok) return { enabled: false, entries: [] };
    const data = await response.json();
    return {
      enabled: data?.enabled === true,
      entries: Array.isArray(data?.entries) ? data.entries : [],
    };
  } catch {
    // Offline or no API (local preview): behave as "not available".
    return { enabled: false, entries: [] };
  }
}

export async function signGuestbook({ name, message, elapsed, website }, fetchImpl = fetch) {
  let response;
  try {
    response = await fetchImpl(URL_, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message, elapsed: Math.round(elapsed), website }),
    });
  } catch {
    throw new Error("Couldn't reach the guestbook. Check your connection.");
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error || "Couldn't post that. Try again later.");
  return data?.entry || null;
}
