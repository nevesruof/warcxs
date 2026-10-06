const RETRY_DELAYS = [3000, 10000, 30000];

export function liveSpotifyTrack(presence, now = Date.now()) {
  const song = presence?.listening_to_spotify ? presence.spotify : null;
  const start = Number(song?.timestamps?.start);
  const end = Number(song?.timestamps?.end);
  if (
    !song?.song ||
    !song.artist ||
    song.timestamps?.paused ||
    !Number.isFinite(start) ||
    start <= 0 ||
    !Number.isFinite(end) ||
    end <= now
  )
    return null;
  return {
    key: JSON.stringify([song.track_id || song.song, song.artist, start]),
    track: song.song,
    artist: song.artist,
    start,
    end,
    video: song.youtube_video_id || song.youtube_url,
  };
}

// Playback follows presence independently of React renders and UI transitions.
export function createSpotifySync({
  readAudio,
  play,
  stop,
  syncTime,
  now = Date.now,
  schedule = setTimeout,
  cancel = clearTimeout,
  hidden = () => document.hidden,
}) {
  let track = null;
  let timer;
  let revision = 0;
  let pending = null;
  let activeKey = null;
  let failures = 0;
  let retryAt = 0;

  function clearTimer() {
    cancel(timer);
    timer = undefined;
  }

  function later(delay) {
    clearTimer();
    timer = schedule(tick, Math.min(delay, Math.max(0, track.end - now())));
  }

  function failed() {
    if (!track || pending !== null) return;
    activeKey = null;
    retryAt =
      now() + RETRY_DELAYS[Math.min(failures++, RETRY_DELAYS.length - 1)];
    later(retryAt - now());
  }

  function tick() {
    clearTimer();
    if (!track) return;
    if (track.end <= now()) {
      update(null);
      return;
    }
    const audio = readAudio();
    if (!audio.entered || audio.isAudioDisabled) return;
    if (
      audio.volume === 0 ||
      audio.playbackSource === "manual" ||
      audio.isClipPlaying ||
      audio.isPlaybackInterrupted
    ) {
      later(track.end - now());
      return;
    }
    if (activeKey === track.key && audio.playbackSource === "spotify") {
      if (audio.isAudioPlaying && !hidden())
        syncTime((now() - track.start) / 1000);
      later(hidden() ? 5000 : 1000);
      return;
    }
    if (pending !== null) return;
    if (now() < retryAt || hidden()) {
      later(Math.max(retryAt - now(), hidden() ? 5000 : 0));
      return;
    }
    const request = revision;
    pending = request;
    activeKey = track.key;
    Promise.resolve(play(track))
      .catch(() => false)
      .then((started) => {
        if (request !== revision || pending !== request) return;
        pending = null;
        if (started) {
          failures = 0;
          retryAt = 0;
          tick();
        } else failed();
      });
  }

  function update(presence) {
    const next = liveSpotifyTrack(presence, now());
    if (next?.key !== track?.key) {
      revision++;
      pending = null;
      activeKey = null;
      failures = 0;
      retryAt = 0;
      clearTimer();
      if (readAudio().playbackSource === "spotify") stop();
    }
    track = next;
    tick();
  }

  return {
    update,
    tick,
    failed,
    position() {
      return track && track.end > now()
        ? Math.max(0, (now() - track.start) / 1000)
        : null;
    },
    retry() {
      retryAt = 0;
      failures = 0;
      tick();
    },
  };
}
