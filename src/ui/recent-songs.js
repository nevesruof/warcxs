import {
  React,
  jsxRuntime,
  b as motion,
  y as AnimatePresence,
  useAudioFields,
} from "./runtime.js";
import {
  Radio as RadioIcon,
  Pause as PauseIcon,
  Play as PlayIcon,
  Headphones as HeadphonesIcon,
  Expand as ExpandIcon,
} from "./music-icons.js";
import { playbackSong, isSelectedSong, SONG_AUDIO_FIELDS } from "../services/music-playback.js";
import { timeAgo } from "../services/time.js";
const contentAnimation = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};
const panelBackground = {
  background: `
    radial-gradient(circle at top left, rgb(var(--p-50) / 0.08), transparent 35%),
    linear-gradient(180deg, rgb(var(--glass-base) / 0.62), rgb(var(--p-950) / 0.8))
  `,
};
const fallbackArtwork = {
  background: `linear-gradient(180deg, rgb(var(--theme-rgb) / 0.34), rgb(var(--p-950) / 0.92))`,
};
const artworkShade = {
  background: `
    linear-gradient(180deg, rgb(2 2 6 / 0.08), rgb(var(--glass-base) / 0.24), rgb(var(--p-950) / 0.92))
  `,
};
const artworkGlow = {
  background: `radial-gradient(circle at top, rgb(var(--p-50) / 0.18), transparent 32%)`,
};
export function createRecentSongs(MusicStats) {
  return function RecentSongs({ songs }) {
    let [selectedId, setSelectedId] = React.useState(
        () => songs[0]?.id || null,
      ),
      [failedArtworkIds, setFailedArtworkIds] = React.useState(() => new Set()),
      [isStatsOpen, setStatsOpen] = React.useState(false),
      audio = useAudioFields(SONG_AUDIO_FIELDS),
      recentSongs = React.useMemo(() => songs.slice(0, 20), [songs]),
      firstRow = React.useMemo(() => recentSongs.slice(0, 10), [recentSongs]),
      secondRow = React.useMemo(() => recentSongs.slice(10, 20), [recentSongs]);
    const selectedSong = recentSongs.find((song) => song.id === selectedId);
    React.useEffect(() => {
      if (selectedSong) void audio.prepareSong(playbackSong(selectedSong));
    }, [selectedSong?.id]);
    React.useEffect(() => {
      if (recentSongs.length === 0) {
        setSelectedId(null);
        return;
      }
      setSelectedId((current) =>
        recentSongs.some((song) => song.id === current)
          ? current
          : recentSongs[0].id,
      );
    }, [recentSongs]);
    React.useEffect(() => {
      setFailedArtworkIds((failed) => {
        if (failed.size === 0) return failed;
        const currentIds = new Set(recentSongs.map((song) => song.id));
        const remaining = new Set(
          [...failed].filter((id) => currentIds.has(id)),
        );
        return remaining.size === failed.size ? failed : remaining;
      });
    }, [recentSongs]);
    if (recentSongs.length === 0) return null;
    let handleArtworkError = (songId) => {
        setFailedArtworkIds((failed) => {
          if (failed.has(songId)) return failed;
          let next = new Set(failed);
          next.add(songId);
          return next;
        });
      },
      toggleRecentSong = (song) => {
        setSelectedId(song.id);
        void audio.toggleSong(playbackSong(song));
      },
      renderSongContent = (song, compact = false) => {
        const available = !!song.trackName && !audio.isAudioDisabled,
          selected = isSelectedSong(audio, song);
        return jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            jsxRuntime.jsxs(motion.div, {
              variants: contentAnimation,
              className: `flex items-start justify-between gap-3`,
              children: [
                jsxRuntime.jsxs(`div`, {
                  className: `inline-flex items-center gap-2 text-[11px] text-purple-200/60`,
                  children: [
                    jsxRuntime.jsx(RadioIcon, {
                      className: `h-3 w-3 text-purple-300/50`,
                    }),
                    jsxRuntime.jsx(`span`, {
                      children: timeAgo(song.listenedAt),
                    }),
                  ],
                }),
                jsxRuntime.jsxs(`button`, {
                  type: `button`,
                  onClick: (event) => {
                    event.stopPropagation();
                    toggleRecentSong(song);
                  },
                  disabled: !available,
                  title: `${selected ? "Stop" : "Play"} ${song.trackName}`,
                  onFocus: () => {
                    void audio.prepareSong(playbackSong(song));
                  },
                  onPointerEnter: () => {
                    void audio.prepareSong(playbackSong(song));
                  },
                  "aria-label": `${selected ? "Stop" : "Play"} ${song.trackName}`,
                  className: `inline-flex items-center gap-2 border-b pb-0.5 text-[11px] font-medium transition-colors ${available ? `border-purple-300/24 text-purple-50 hover:border-purple-300/45` : `cursor-not-allowed border-purple-400/[0.08] text-purple-300/35`}`,
                  children: [
                    selected
                      ? jsxRuntime.jsx(PauseIcon, {
                          className: `h-3.5 w-3.5 fill-current`,
                        })
                      : jsxRuntime.jsx(PlayIcon, {
                          className: `h-3.5 w-3.5 fill-current`,
                        }),
                    jsxRuntime.jsx(`span`, {
                      children: selected
                        ? "Stop"
                        : available
                          ? "Play"
                          : "Unavailable",
                    }),
                  ],
                }),
              ],
            }),
            jsxRuntime.jsxs(motion.div, {
              variants: contentAnimation,
              className: `space-y-1.5`,
              children: [
                jsxRuntime.jsx(`h3`, {
                  className: `${compact ? `text-xl` : `text-2xl`} max-w-[24rem] font-semibold text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`,
                  children: song.trackName,
                }),
                jsxRuntime.jsx(`p`, {
                  className: `text-sm text-purple-100/80`,
                  children: song.artistName,
                }),
                song.albumName &&
                  jsxRuntime.jsx(`p`, {
                    className: `max-w-[24rem] text-[12px] text-purple-200/45 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden`,
                    children: song.albumName,
                  }),
              ],
            }),
            song.tags?.length > 0 &&
              jsxRuntime.jsx(motion.div, {
                variants: contentAnimation,
                className: `flex flex-wrap gap-2`,
                children: song.tags.slice(0, compact ? 3 : 4).map((t) =>
                  jsxRuntime.jsx(
                    `span`,
                    {
                      className: `border-l border-purple-200/14 pl-2 text-[10px] uppercase tracking-[0.16em] text-purple-100/65 first:border-l-0 first:pl-0`,
                      children: t,
                    },
                    `${song.id}-${t}`,
                  ),
                ),
              }),
          ],
        });
      };
    return jsxRuntime.jsxs(`section`, {
      className: `recent-songs-panel surface-panel flex h-full w-full min-w-0 max-w-full flex-col overflow-hidden rounded-xl border border-purple-400/[0.08] p-4 sm:p-5`,
      style: panelBackground,
      children: [
        jsxRuntime.jsxs(`div`, {
          className: `mb-4 flex items-start justify-between gap-4`,
          children: [
            jsxRuntime.jsxs(`div`, {
              children: [
                jsxRuntime.jsxs(`div`, {
                  className: `mb-2 flex items-center gap-2`,
                  children: [
                    jsxRuntime.jsx(HeadphonesIcon, {
                      className: `h-4 w-4 text-purple-300/55`,
                    }),
                    jsxRuntime.jsx(`h3`, {
                      className: `text-xs font-semibold uppercase tracking-[0.24em] text-purple-300/55`,
                      children: `What I've been listening to`,
                    }),
                  ],
                }),
                jsxRuntime.jsx(`p`, {
                  className: `max-w-2xl text-sm text-purple-100/55`,
                  children: `Last 20 songs I've listened to, give them a try.`,
                }),
              ],
            }),
            jsxRuntime.jsx(`button`, {
              type: `button`,
              className: `inline-flex h-8 w-8 items-center justify-center rounded-md border border-purple-300/15 text-purple-200/70 transition-colors hover:border-purple-200/30 hover:text-purple-100`,
              "aria-label": `Open music stats`,
              title: `Open music stats`,
              onClick: () => setStatsOpen(true),
              children: jsxRuntime.jsx(ExpandIcon, {
                className: `h-4 w-4`,
              }),
            }),
          ],
        }),
        jsxRuntime.jsx(`div`, {
          className: `hidden w-full min-h-0 flex-1 flex-col gap-2 overflow-hidden lg:flex`,
          children: [firstRow, secondRow]
            .filter((e) => e.length > 0)
            .map((row, rowIndex) =>
              jsxRuntime.jsx(
                `div`,
                {
                  className: `flex min-h-0 flex-1 gap-1.5 overflow-hidden`,
                  children: row.map((song, songIndex) => {
                    let index = rowIndex * 10 + songIndex,
                      selected = selectedId === song.id,
                      hasArtwork =
                        !!song.albumArtUrl && !failedArtworkIds.has(song.id);
                    return jsxRuntime.jsxs(
                      `article`,
                      {
                        onMouseEnter: () => setSelectedId(song.id),
                        onFocus: () => setSelectedId(song.id),
                        onClick: () => setSelectedId(song.id),
                        onKeyDown: (event) => {
                          if (event.target !== event.currentTarget) return;
                          (event.key === `Enter` || event.key === ` `) &&
                            (event.preventDefault(), setSelectedId(song.id));
                        },
                        role: `button`,
                        tabIndex: 0,
                        style: {
                          flexGrow: selected ? 2.8 : 1,
                          flexBasis: 0,
                        },
                        className: `group relative min-h-0 overflow-hidden rounded-xl border text-left transition-[flex-grow] duration-200 ease-out ${selected ? `border-purple-200/20` : `border-purple-200/10`}`,
                        children: [
                          hasArtwork
                            ? jsxRuntime.jsx(`img`, {
                                src: song.albumArtUrl,
                                alt: `${song.trackName} album art`,
                                className: `h-full w-full object-cover`,
                                loading: index < 10 ? `eager` : `lazy`,
                                decoding: `async`,
                                onError: () => handleArtworkError(song.id),
                              })
                            : jsxRuntime.jsx(`div`, {
                                className: `h-full w-full`,
                                style: fallbackArtwork,
                              }),
                          jsxRuntime.jsx(`div`, {
                            className: `absolute inset-0`,
                            style: artworkShade,
                          }),
                          jsxRuntime.jsx(`div`, {
                            className: `absolute inset-0`,
                            style: artworkGlow,
                          }),
                          selected
                            ? jsxRuntime.jsx(`div`, {
                                className: `absolute inset-0 flex flex-col justify-between p-2.5`,
                                children: jsxRuntime.jsx(`div`, {
                                  className: `space-y-2`,
                                  children: renderSongContent(song, true),
                                }),
                              })
                            : jsxRuntime.jsxs(`div`, {
                                className: `absolute inset-0`,
                                children: [
                                  jsxRuntime.jsx(`div`, {
                                    className: `absolute left-1/2 top-2 -translate-x-1/2 text-[9px] font-medium text-white/70`,
                                    children: index + 1,
                                  }),
                                  jsxRuntime.jsx(`div`, {
                                    className: `absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-white/65`,
                                    style: {
                                      writingMode: `vertical-rl`,
                                      transform: `translateX(-50%) rotate(180deg)`,
                                    },
                                    children: song.artistName,
                                  }),
                                ],
                              }),
                        ],
                      },
                      song.id,
                    );
                  }),
                },
                `listening-row-${rowIndex}`,
              ),
            ),
        }),
        jsxRuntime.jsx(`div`, {
          className: `flex w-full min-w-0 gap-3 overflow-x-auto pb-1 lg:hidden`,
          children: recentSongs.map((song) => {
            let selected = selectedId === song.id,
              hasArtwork = !!song.albumArtUrl && !failedArtworkIds.has(song.id);
            return jsxRuntime.jsxs(
              motion.article,
              {
                whileTap: {
                  scale: 0.985,
                },
                onClick: () => setSelectedId(song.id),
                onKeyDown: (event) => {
                  if (event.target !== event.currentTarget) return;
                  (event.key === `Enter` || event.key === ` `) &&
                    (event.preventDefault(), setSelectedId(song.id));
                },
                role: `button`,
                tabIndex: 0,
                className: `relative min-h-[210px] w-[calc(100vw-2.5rem)] max-w-[calc(100vw-2.5rem)] shrink-0 overflow-hidden rounded-[24px] border text-left sm:w-[280px] sm:max-w-[280px] ${selected ? `border-purple-200/20` : `border-purple-200/10`}`,
                children: [
                  hasArtwork
                    ? jsxRuntime.jsx(`img`, {
                        src: song.albumArtUrl,
                        alt: `${song.trackName} album art`,
                        className: `absolute inset-0 h-full w-full object-cover`,
                        loading: `lazy`,
                        decoding: `async`,
                        onError: () => handleArtworkError(song.id),
                      })
                    : jsxRuntime.jsx(`div`, {
                        className: `absolute inset-0`,
                        style: fallbackArtwork,
                      }),
                  jsxRuntime.jsx(`div`, {
                    className: `absolute inset-0`,
                    style: artworkShade,
                  }),
                  jsxRuntime.jsx(`div`, {
                    className: `absolute inset-0`,
                    style: artworkGlow,
                  }),
                  jsxRuntime.jsx(motion.article, {
                    className: `absolute inset-0 flex flex-col justify-between p-4`,
                    initial: {
                      opacity: 0,
                      y: 10,
                    },
                    animate: {
                      opacity: 1,
                      y: 0,
                    },
                    children: jsxRuntime.jsx(`div`, {
                      className: `space-y-3`,
                      children: renderSongContent(song, true),
                    }),
                  }),
                ],
              },
              `${song.id}-mobile`,
            );
          }),
        }),
        jsxRuntime.jsx(AnimatePresence, {
          children: isStatsOpen
            ? jsxRuntime.jsx(MusicStats, {
                isModal: true,
                onClose: () => setStatsOpen(false),
              })
            : null,
        }),
      ],
    });
  };
}
