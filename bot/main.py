"""Personal Discord + public Roblox tracker. No Lanyard, no messages."""
import asyncio
import contextlib
import hmac
import json
import logging
import os
import signal
import time
from pathlib import Path

import aiohttp
from aiohttp import web
import discord
from dotenv import load_dotenv
from recorder import Recorder

ROOT = Path(__file__).resolve().parent
load_dotenv(ROOT / '.env')
CONFIG = json.loads((ROOT / 'config.json').read_text())
# config.json is the source of truth, including after switching accounts.
USER_ID = int(CONFIG['discord_user_id'])
DISCORD_HISTORY = f'discord:{USER_ID}'
STATUS_HISTORY = f'status:{USER_ID}'
ROBLOX_USER = os.getenv('ROBLOX_USERNAME', CONFIG['roblox_username'])
log = logging.getLogger('tracker')

class Tracker(discord.Client):
    def __init__(self, db):
        intents = discord.Intents.none()
        intents.guilds = True
        intents.members = True
        intents.presences = True
        super().__init__(intents=intents, chunk_guilds_at_startup=False)
        self.db = db
        self.live = {'status': 'unknown', 'activities': [], 'updatedAt': None}
        self.roblox = {'username': ROBLOX_USER, 'status': 'unknown', 'updatedAt': None}
        self.observed = {}
        # Activities seen just before a disconnect, so a gateway blip does not
        # reset the start time of games that carry no Discord timestamps.
        self.stale = ({}, 0.0)
        self.target_guild = None
        # Public account fields (name, avatar, banner); the site mirrors these.
        self.profile = None

    async def refresh_profile(self):
        try:
            raw = await self.http.get_user(USER_ID)  # raw REST payload: also carries newer fields
        except (discord.HTTPException, asyncio.TimeoutError, discord.ClientException):
            return  # keep the last known profile
        profile = {
            'id': str(raw.get('id', USER_ID)), 'username': raw.get('username'),
            'global_name': raw.get('global_name'),
            'avatar': raw.get('avatar'), 'banner': raw.get('banner'),
            'accent_color': raw.get('accent_color'),
            'discriminator': str(raw.get('discriminator', '0')),
        }
        # Font/effect/colours of the display name, when Discord reports them.
        if 'display_name_styles' in raw:
            profile['display_name_styles'] = raw['display_name_styles']
        self.profile = profile

    def capture(self, member):
        items = {}
        now = time.time()
        for activity in (member.activities if str(member.status) != 'offline' else []):
            kind = activity.type.name
            application_id = getattr(activity, 'application_id', None)
            timestamps = getattr(activity, 'timestamps', {}) or {}
            start = getattr(activity, 'start', None)
            end = getattr(activity, 'end', None)
            start_ms = int(start.timestamp()*1000) if start else timestamps.get('start')
            end_ms = int(end.timestamp()*1000) if end else timestamps.get('end')
            if isinstance(activity, discord.Spotify):
                key = 'spotify:' + activity.track_id + ':' + str(start_ms or '')
                item = {'kind': 'spotify', 'type': 2, 'name': activity.title, 'artist': activity.artist,
                        'album': activity.album, 'image': activity.album_cover_url,
                        'url': activity.track_url, 'trackId': activity.track_id}
            else:
                key = f'{kind}:{application_id or activity.name}'
                item = {'kind': kind, 'type': activity.type.value, 'name': activity.name,
                        'details': getattr(activity, 'details', None),
                        'state': (getattr(activity, 'state', None) or activity.name) if kind == 'custom' else getattr(activity, 'state', None),
                        'image': getattr(activity, 'large_image_url', None),
                        'largeText': getattr(activity, 'large_image_text', None),
                        'applicationId': str(application_id) if application_id else None}
            # Games without Discord timestamps still keep a stable start time.
            stale, stale_at = self.stale
            previous = self.observed.get(key) or (stale.get(key, {}) if now - stale_at < 120 else {})
            item.update(key=key, startMs=start_ms or previous.get('startMs') or int(now*1000), endMs=end_ms)
            items[key] = item
        self.observed = items
        self.live = {'status': str(member.status), 'activities': list(items.values()), 'updatedAt': now,
                     'desktopStatus': str(member.desktop_status), 'webStatus': str(member.web_status),
                     'mobileStatus': str(member.mobile_status)}
        self.db.observe(DISCORD_HISTORY, {k:v for k,v in items.items() if v['type'] != 4}, now)
        self.db.observe(STATUS_HISTORY, {str(member.status): {'name': str(member.status)}}, now)

    async def seed(self):
        for guild in self.guilds:
            try:
                members = await guild.query_members(user_ids=[USER_ID], presences=True, cache=True)
                if members:
                    self.target_guild = guild.id
                    self.capture(members[0])
                    log.info('Discord listo: usuario encontrado.')
                    return
            except (discord.HTTPException, asyncio.TimeoutError, discord.ClientException):
                continue
        self.target_guild = None
        self.live['status'] = 'unknown'
        log.warning('Usuario no encontrado: revisa servidor compartido e intents.')

    async def on_ready(self):
        await self.seed()
        await self.refresh_profile()

    async def on_resumed(self):
        await self.seed()

    async def on_presence_update(self, before, after):
        if after.id == USER_ID and (self.target_guild is None or after.guild.id == self.target_guild):
            self.target_guild = after.guild.id
            self.capture(after)

    async def on_disconnect(self):
        self.db.observe(DISCORD_HISTORY, {})
        self.stale = (self.observed, time.time())
        self.observed = {}
        self.live['status'] = 'unknown'
        self.live['activities'] = []
        self.live['updatedAt'] = time.time()
        self.db.observe(STATUS_HISTORY, {})

    async def on_member_remove(self, member):
        if member.id == USER_ID and member.guild.id == self.target_guild:
            self.db.observe(DISCORD_HISTORY, {})
            self.target_guild = None
            self.observed = {}
            self.live = {'status': 'unknown', 'activities': [], 'updatedAt': time.time()}

    async def heartbeat(self):
        ticks = 0
        while True:
            await asyncio.sleep(60)
            ticks += 1
            if ticks % 1440 == 0:  # once a day
                self.db.prune()
            if ticks % 5 == 0 and self.is_ready():  # name/avatar/banner every 5 minutes
                await self.refresh_profile()
            if self.is_ready() and self.target_guild is not None:
                self.db.observe(DISCORD_HISTORY, {k:v for k,v in self.observed.items() if v['type'] != 4})
                self.db.observe(STATUS_HISTORY, {self.live['status']:{'name':self.live['status']}})
                self.live['updatedAt'] = time.time()
            elif self.is_ready():
                await self.seed()

async def poll_roblox(bot, session):
    user_id = None
    cache = {}
    failures = 0
    while True:
        delay = 60
        try:
            if user_id is None:
                async with session.post('https://users.roblox.com/v1/usernames/users',
                        json={'usernames': [ROBLOX_USER], 'excludeBannedUsers': True}) as response:
                    response.raise_for_status()
                    users = (await response.json()).get('data', [])
                    if not users:
                        raise ValueError('Username not found')
                    user_id = users[0]['id']
            async with session.post('https://presence.roblox.com/v1/presence/users',
                                    json={'userIds': [user_id]}) as response:
                if response.status == 429:
                    delay = min(3600, max(60, float(response.headers.get('Retry-After', '120'))))
                response.raise_for_status()
                presences = (await response.json()).get('userPresences', [])
                if not presences:
                    raise ValueError('Presence unavailable')
                presence = presences[0]
            kind = presence.get('userPresenceType')
            universe = presence.get('universeId')
            state = {0:'offline', 1:'online', 2:'in_game', 3:'studio'}.get(kind, 'unknown')
            items = {}
            if kind == 2 and universe:
                if universe not in cache:
                    async with session.get('https://games.roblox.com/v1/games',
                                           params={'universeIds': str(universe)}) as response:
                        response.raise_for_status()
                        games = (await response.json()).get('data', [])
                        if not games:
                            raise ValueError('Game unavailable')
                        if len(cache) > 100:
                            cache.clear()
                        cache[universe] = games[0]
                game = cache[universe]
                place = game.get('rootPlaceId') or presence.get('placeId')
                items[str(universe)] = {'name': game['name'], 'universeId': universe,
                                       'placeId': place, 'url': f'https://www.roblox.com/games/{place}' if place else None}
            elif kind == 2:
                state = 'game_hidden'
            bot.db.observe('roblox', items)
            bot.roblox = {'username': ROBLOX_USER, 'userId': user_id, 'status': state,
                          'currentGame': next(iter(items.values()), None), 'updatedAt': time.time()}
            failures = 0
        except (aiohttp.ClientError, asyncio.TimeoutError, ValueError, KeyError, TypeError):
            failures += 1
            bot.db.observe('roblox', {})
            bot.roblox.update(status='unavailable', currentGame=None)
            delay = max(delay, min(900, 60 * 2 ** min(failures-1, 4)))
            log.warning('Roblox no disponible; se reintentara sin borrar el historial.')
        await asyncio.sleep(delay)

def create_app(bot):
    token = os.getenv('API_TOKEN', '')
    origin = os.getenv('SITE_ORIGIN', 'https://www.warcxs.com')

    @web.middleware
    async def access(request, handler):
        if request.method == 'OPTIONS':
            response = web.Response(status=204)
        elif request.path != '/health' and token and not hmac.compare_digest(
                # Bytes: compare_digest raises TypeError on non-ASCII str headers.
                request.headers.get('Authorization', '').encode(), ('Bearer ' + token).encode()):
            response = web.json_response({'error': 'unauthorized'}, status=401)
        else:
            response = await handler(request)
        response.headers['Cache-Control'] = 'no-store'
        if request.headers.get('Origin') == origin:
            response.headers['Access-Control-Allow-Origin'] = origin
            response.headers['Vary'] = 'Origin'
            response.headers['Access-Control-Allow-Headers'] = 'Authorization'
            response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        return response

    async def health(request):
        return web.json_response({'ok': True, 'discordConnected': bot.is_ready()})

    snapshot_cache = {'at': 0.0, 'body': None}

    async def snapshot(request):
        # Several Vercel instances may poll at once; build the payload (4 SQLite
        # queries) at most once every 5 seconds.
        now = time.time()
        if snapshot_cache['body'] is None or now - snapshot_cache['at'] > 5:
            roblox_history = bot.db.history('roblox')
            snapshot_cache['body'] = {'discordUserId': str(USER_ID),
                'discord': dict(bot.live, connected=bot.is_ready()),
                'profile': bot.profile,
                'recentActivities': bot.db.history(DISCORD_HISTORY, limit=100, exclude_kind='spotify'),
                'recentSongs': bot.db.history(DISCORD_HISTORY, limit=100, kind='spotify'),
                'recentStatuses': bot.db.history(STATUS_HISTORY, limit=100),
                'roblox': dict(bot.roblox, lastPlayed=roblox_history[0] if roblox_history else None),
                'recentRobloxGames': roblox_history, 'generatedAt': now}
            snapshot_cache['at'] = now
        return web.json_response(snapshot_cache['body'])

    app = web.Application(middlewares=[access])
    app.router.add_get('/health', health)
    app.router.add_get('/api/activity', snapshot)
    app.router.add_route('OPTIONS', '/api/activity', snapshot)
    return app

async def main():
    token = os.getenv('DISCORD_TOKEN', '').strip()
    if not token or token == 'PEGA_AQUI_EL_TOKEN_DEL_BOT':
        raise SystemExit('Falta DISCORD_TOKEN. Configuralo en el hosting o en .env, nunca en el chat.')
    port = int(os.getenv('PORT', os.getenv('SERVER_PORT', '8080')))
    db_path = Path(os.getenv('DATA_PATH', str(ROOT / 'data' / 'activity.sqlite3')))
    db = Recorder(db_path)
    bot = Tracker(db)
    runner = web.AppRunner(create_app(bot), access_log=None)
    tasks = []
    try:
        await runner.setup()
        await web.TCPSite(runner, '0.0.0.0', port).start()
        log.info('API en puerto %s. Historial persistente: %s', port, db_path)
        async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=20)) as session:
            tasks = [asyncio.create_task(bot.start(token)), asyncio.create_task(bot.heartbeat()),
                     asyncio.create_task(poll_roblox(bot, session))]
            stop = asyncio.Event()
            for sig in (signal.SIGINT, signal.SIGTERM):
                with contextlib.suppress(NotImplementedError):
                    asyncio.get_running_loop().add_signal_handler(sig, stop.set)
            tasks.append(asyncio.create_task(stop.wait()))
            done, _ = await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)
            for task in done:
                task.result()
    finally:
        for task in tasks:
            task.cancel()
        await asyncio.gather(*tasks, return_exceptions=True)
        await bot.close()
        await runner.cleanup()
        db.close()

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
    try:
        asyncio.run(main())
    except discord.PrivilegedIntentsRequired:
        raise SystemExit('Activa Presence Intent y Server Members Intent en Discord Developer Portal.')
    except discord.LoginFailure:
        raise SystemExit('Token de bot invalido. Actualiza DISCORD_TOKEN en el hosting.')
