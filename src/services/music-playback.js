export const SONG_AUDIO_FIELDS = [
  "isAudioDisabled",
  "isAudioPlaying",
  "isAudioLoading",
  "playbackSource",
  "manualPlaybackDetails",
];

export function statsTrackKey(track) {
  return [track.id, track.name, track.artists.join(",")].join("::");
}

export function playbackSong(song) {
  const recent = typeof song.trackName === "string";
  return {
    id: recent ? `recent:${song.id}` : `statsfm:${statsTrackKey(song)}`,
    trackName: recent ? song.trackName : song.name,
    artistName: recent ? song.artistName : song.artists.join(", "),
    albumName: recent ? song.albumName : song.album,
    albumArtUrl: recent ? song.albumArtUrl : song.image,
    spotifyUrl: song.spotifyUrl,
    youtubeUrl: song.youtubeUrl,
  };
}

export function isSelectedSong(audio, song) {
  return (
    audio.playbackSource === "manual" &&
    audio.manualPlaybackDetails?.id === playbackSong(song).id
  );
}
