import os
import sys
import tempfile
import time
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from recorder import Recorder, REOPEN_WINDOW

GAME = {'game:1': {'kind': 'playing', 'name': 'Minecraft', 'type': 0}}


class RecorderTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.db = Recorder(os.path.join(self.directory.name, 'activity.sqlite3'))

    def tearDown(self):
        self.db.close()
        self.directory.cleanup()

    def test_gateway_blip_does_not_split_a_session(self):
        self.db.observe('discord:1', GAME, 1000)
        self.db.observe('discord:1', {}, 1100)    # on_disconnect
        self.db.observe('discord:1', GAME, 1105)  # on_resumed -> seed()
        rows = self.db.history('discord:1')
        self.assertEqual(len(rows), 1)
        self.assertEqual(rows[0]['firstSeen'], 1000)
        self.assertEqual(rows[0]['lastSeen'], 1105)
        self.assertTrue(rows[0]['active'])

    def test_restart_after_the_window_is_a_new_session(self):
        self.db.observe('discord:1', GAME, 1000)
        self.db.observe('discord:1', {}, 1100)
        self.db.observe('discord:1', GAME, 1100 + REOPEN_WINDOW + 1)
        self.assertEqual(len(self.db.history('discord:1')), 2)

    def test_reopen_only_matches_the_same_provider_and_key(self):
        self.db.observe('discord:1', GAME, 1000)
        self.db.observe('discord:1', {}, 1100)
        self.db.observe('roblox', GAME, 1105)
        self.db.observe('discord:1', {'game:2': {'kind': 'playing', 'name': 'Other'}}, 1105)
        self.assertEqual(len(self.db.history('discord:1')), 2)
        self.assertEqual(len(self.db.history('roblox')), 1)

    def test_prune_removes_only_old_finished_sessions(self):
        now = time.time()
        old = now - 100 * 86400
        self.db.observe('discord:1', {'old': {'kind': 'playing', 'name': 'Old'}}, old)
        self.db.observe('discord:1', {}, old + 60)
        self.db.observe('discord:1', {'new': {'kind': 'playing', 'name': 'New'}}, now)
        self.db.prune()
        self.assertEqual([r['name'] for r in self.db.history('discord:1')], ['New'])

    def test_indexes_exist(self):
        names = {r['name'] for r in self.db.db.execute("SELECT name FROM sqlite_master WHERE type='index'")}
        self.assertIn('idx_sessions_active', names)
        self.assertIn('idx_sessions_seen', names)


if __name__ == '__main__':
    unittest.main()
