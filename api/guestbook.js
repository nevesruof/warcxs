import {
  GuestbookError,
  addEntry,
  cleanMessage,
  cleanName,
  isEnabled,
  listEntries,
  notify,
  removeEntry,
  takeSlot,
  verify,
} from '../lib/guestbook.js';

const MIN_FILL_MS = 2500; // a human needs a moment to type
const html = (title, body) =>
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title><body style="font:16px system-ui;background:#0e0e0e;color:#e4e4e4;display:grid;place-items:center;min-height:100vh;margin:0"><main style="max-width:26rem;padding:1.5rem;text-align:center">${body}</main>`;

const clientIp = (req) =>
  String(req.headers?.['x-real-ip'] || req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();

const readBody = (req) => {
  const body = req.body;
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return Object.fromEntries(new URLSearchParams(body));
    }
  }
  return body && typeof body === 'object' ? body : {};
};

const sameSite = (req) => {
  const origin = req.headers?.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
};

const baseUrl = (req) => `https://${req.headers?.host || 'warcxs.com'}`;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const url = new URL(req.url, 'http://localhost');

    if (req.method === 'GET' && url.searchParams.has('delete')) {
      // Confirmation page only: chat apps pre-fetch links, so a GET must never delete.
      const id = url.searchParams.get('delete');
      const sig = url.searchParams.get('sig');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      if (!verify(id, sig)) return res.status(403).send(html('Invalid link', '<h1>Invalid link</h1>'));
      return res
        .status(200)
        .send(
          html(
            'Remove entry',
            `<h1>Remove this entry?</h1><form method="post" action="/api/guestbook"><input type="hidden" name="delete" value="${id}"><input type="hidden" name="sig" value="${sig}"><button style="padding:.7rem 1.4rem;border-radius:.6rem;border:0;font:inherit;cursor:pointer">Remove</button></form>`,
          ),
        );
    }

    if (req.method === 'GET') {
      if (!isEnabled()) {
        res.setHeader('Cache-Control', 'public, s-maxage=60');
        return res.status(200).json({ enabled: false, entries: [] });
      }
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=30');
      return res.status(200).json({ enabled: true, entries: await listEntries() });
    }

    if (req.method === 'POST') {
      const body = readBody(req);

      if (body.delete) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        if (!verify(String(body.delete), String(body.sig || '')))
          return res.status(403).send(html('Invalid link', '<h1>Invalid link</h1>'));
        const removed = await removeEntry(String(body.delete));
        return res.status(200).send(html('Removed', `<h1>${removed ? 'Removed ✓' : 'Already gone'}</h1>`));
      }

      if (!sameSite(req)) throw new GuestbookError('Not allowed', 403);
      if (!isEnabled()) throw new GuestbookError('Guestbook is not set up yet', 503);
      // Bots fill every field and submit instantly.
      if (body.website) return res.status(201).json({ entry: null });
      if (!(Number(body.elapsed) >= MIN_FILL_MS)) throw new GuestbookError('Take a second and try again');
      const name = cleanName(body.name);
      const message = cleanMessage(body.message);
      await takeSlot(clientIp(req));
      const entry = await addEntry({ name, message });
      await notify(entry, baseUrl(req));
      return res.status(201).json({ entry });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    const status = error instanceof GuestbookError ? error.status : 503;
    return res
      .status(status)
      .json({ error: error instanceof GuestbookError ? error.message : 'Guestbook temporarily unavailable' });
  }
}
