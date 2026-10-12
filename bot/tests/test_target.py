import os
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

import discord
from aiohttp.test_utils import TestClient, TestServer

# A pre-existing hosting variable must not override the new config.json target.
with patch.dict(os.environ, {"DISCORD_USER_ID": "1239908273885286546"}):
    import main
from recorder import Recorder


class TargetTests(unittest.IsolatedAsyncioTestCase):
    async def test_new_account_keeps_old_history_but_never_publishes_it(self):
        self.assertEqual(main.USER_ID, 893966003690668102)
        with tempfile.TemporaryDirectory() as directory:
            db = Recorder(Path(directory) / "activity.sqlite3")
            db.observe("discord", {"old": {"name": "Previous user's game", "kind": "playing"}})
            db.observe("roblox", {"game": {"name": "Roblox game"}})
            bot = main.Tracker(db)
            member = SimpleNamespace(
                status="online", desktop_status="online", web_status="offline",
                mobile_status="offline", activities=[discord.Game("New game")],
            )
            bot.capture(member)
            with patch.dict(os.environ, {"API_TOKEN": ""}):
                client = TestClient(TestServer(main.create_app(bot)))
                await client.start_server()
                try:
                    response = await client.get("/api/activity")
                    payload = await response.json()
                    self.assertEqual(payload["discordUserId"], "893966003690668102")
                    self.assertEqual([item["name"] for item in payload["recentActivities"]], ["New game"])
                    self.assertEqual(payload["recentRobloxGames"][0]["name"], "Roblox game")
                    self.assertEqual(db.history("discord")[0]["name"], "Previous user's game")
                    await bot.on_disconnect()
                    self.assertFalse(db.history(main.DISCORD_HISTORY)[0]["active"])
                finally:
                    await client.close()
                    await bot.close()
                    db.close()

    async def test_presence_updates_ignore_the_previous_user(self):
        with tempfile.TemporaryDirectory() as directory:
            db = Recorder(Path(directory) / "activity.sqlite3")
            bot = main.Tracker(db)
            try:
                with patch.object(bot, "capture") as capture:
                    await bot.on_presence_update(None, SimpleNamespace(id=1239908273885286546))
                    capture.assert_not_called()
                    member = SimpleNamespace(id=main.USER_ID, guild=SimpleNamespace(id=1))
                    await bot.on_presence_update(None, member)
                    capture.assert_called_once_with(member)
            finally:
                await bot.close()
                db.close()
