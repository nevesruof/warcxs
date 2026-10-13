"""Persistent SQLite history. Times are observed UTC Unix seconds."""
import json
import sqlite3
import time
from pathlib import Path

# A session that ended less than this many seconds ago is reopened instead of
# duplicated. Gateway reconnects and transient Roblox failures close sessions
# for a moment; without this window every blip split one session in two.
REOPEN_WINDOW = 120
RETENTION_DAYS = 90

class Recorder:
    def __init__(self, path):
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        self.db = sqlite3.connect(path)
        self.db.row_factory = sqlite3.Row
        self.db.execute('PRAGMA journal_mode=WAL')
        # WAL + NORMAL cannot corrupt the file; at worst the last commit is lost
        # on power failure, which is fine for activity history and avoids an
        # fsync on every presence update.
        self.db.execute('PRAGMA synchronous=NORMAL')
        self.db.execute('PRAGMA busy_timeout=5000')
        self.db.execute('''CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY, provider TEXT, item_key TEXT,
            payload TEXT, first_seen REAL, last_seen REAL, active INTEGER)''')
        # observe() filters by provider+active; history() orders by last_seen.
        self.db.execute('CREATE INDEX IF NOT EXISTS idx_sessions_active ON sessions(provider, active)')
        self.db.execute('CREATE INDEX IF NOT EXISTS idx_sessions_seen ON sessions(provider, last_seen DESC)')
        self.db.execute('UPDATE sessions SET active=0')
        self.db.commit()
        self.prune()

    def observe(self, provider, items, now=None):
        now = time.time() if now is None else now
        existing = {r['item_key']: r for r in self.db.execute(
            'SELECT * FROM sessions WHERE provider=? AND active=1', (provider,))}
        for key, payload in items.items():
            raw = json.dumps(payload, ensure_ascii=False)
            previous = existing.pop(key, None)
            if previous:
                self.db.execute('UPDATE sessions SET payload=?,last_seen=? WHERE id=?',
                                (raw, now, previous['id']))
                continue
            recent = self.db.execute(
                'SELECT id FROM sessions WHERE provider=? AND item_key=? AND active=0 '
                'AND last_seen>=? ORDER BY last_seen DESC LIMIT 1',
                (provider, key, now - REOPEN_WINDOW)).fetchone()
            if recent:
                self.db.execute('UPDATE sessions SET payload=?,last_seen=?,active=1 WHERE id=?',
                                (raw, now, recent['id']))
            else:
                self.db.execute('INSERT INTO sessions VALUES(NULL,?,?,?,?,?,1)',
                                (provider, key, raw, now, now))
        for row in existing.values():
            self.db.execute('UPDATE sessions SET active=0 WHERE id=?', (row['id'],))
        self.db.commit()

    def prune(self, days=RETENTION_DAYS):
        """Drop finished sessions older than `days`; the table never shrinks otherwise."""
        cutoff = time.time() - days * 86400
        self.db.execute('DELETE FROM sessions WHERE active=0 AND last_seen<?', (cutoff,))
        self.db.commit()

    def history(self, provider, limit=100, kind=None, exclude_kind=None):
        # Filter before LIMIT: music must never push games out of the result.
        query = 'SELECT * FROM sessions WHERE provider=?'
        args = [provider]
        if kind is not None:
            query += " AND json_extract(payload, '$.kind')=?"
            args.append(kind)
        if exclude_kind is not None:
            query += " AND COALESCE(json_extract(payload, '$.kind'), '') != ?"
            args.append(exclude_kind)
        query += ' ORDER BY last_seen DESC,id DESC LIMIT ?'
        args.append(max(1, min(int(limit), 1000)))
        return [dict(json.loads(r['payload']), sessionId=r['id'],
                     firstSeen=r['first_seen'], lastSeen=r['last_seen'], active=bool(r['active']))
                for r in self.db.execute(query, args)]

    def close(self):
        self.db.execute('UPDATE sessions SET active=0')
        self.db.commit()
        self.db.close()
