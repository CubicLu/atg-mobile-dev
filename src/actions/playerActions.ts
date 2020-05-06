import {
  PlayerActionType,
  PlaylistInterface,
  SongInterface,
  Action,
  SeekPositionInteface,
  SetPlaylistInterface,
  PlaySongInterface
} from '../interfaces';

export const togglePlayer = (): Action<PlayerActionType.TOGGLE_PLAYER> => {
  return { type: PlayerActionType.TOGGLE_PLAYER };
};
export const toggleShuffle = (): Action<PlayerActionType.TOGGLE_SHUFFLE> => {
  return { type: PlayerActionType.TOGGLE_SHUFFLE };
};
export const toggleRepeat = (): Action<PlayerActionType.TOGGLE_REPEAT> => {
  return { type: PlayerActionType.TOGGLE_REPEAT };
};
export const favoriteSong = (): Action<PlayerActionType.FAVORITE_SONG> => {
  return { type: PlayerActionType.FAVORITE_SONG };
};
export const toggleNextSong = (): Action<PlayerActionType.TOGGLE_CURRENT_NEXT_SONG> => {
  return { type: PlayerActionType.TOGGLE_CURRENT_NEXT_SONG };
};
export const pauseSong = (): Action<PlayerActionType.PAUSE_SONG> => {
  return { type: PlayerActionType.PAUSE_SONG };
};
export const nextSong = (): Action<PlayerActionType.NEXT_SONG> => {
  return { type: PlayerActionType.NEXT_SONG };
};
export const prevSong = (): Action<PlayerActionType.PREV_SONG> => {
  return { type: PlayerActionType.PREV_SONG };
};
export const stopSong = (): Action<PlayerActionType.STOP_SONG> => {
  return { type: PlayerActionType.STOP_SONG };
};
export const resumeSong = (): Action<PlayerActionType.RESUME_SONG> => {
  return { type: PlayerActionType.RESUME_SONG };
};

export const setPlaylist = (
  playlist: PlaylistInterface,
  song: SongInterface
): Action<PlayerActionType.SET_PLAYLIST, SetPlaylistInterface> => {
  return { type: PlayerActionType.SET_PLAYLIST, payload: { playlist, song } };
};
export const playSong = (
  song: SongInterface,
  nextSong?: SongInterface
): Action<PlayerActionType.PLAY_SONG, PlaySongInterface> => {
  return { type: PlayerActionType.PLAY_SONG, payload: { song, nextSong } };
};
export const loadNextSong = (payload: SongInterface): Action<PlayerActionType.LOAD_NEXT_SONG, SongInterface> => {
  return { type: PlayerActionType.LOAD_NEXT_SONG, payload };
};
export const seekSongPosition = (
  seekTo: number,
  increase: boolean = false
): Action<PlayerActionType.SEEK_TO_SONG, SeekPositionInteface> => {
  return { type: PlayerActionType.SEEK_TO_SONG, payload: { seekTo, increase } };
};
export const updateElapsed = (timeElapsed: number): Action<PlayerActionType.UPDATE_ELAPSED_SONG, number> => {
  return { type: PlayerActionType.UPDATE_ELAPSED_SONG, payload: timeElapsed };
};
export const updateDuration = (duration: number): Action<PlayerActionType.UPDATE_SONG_DURATION,number> => {
  return { type: PlayerActionType.UPDATE_SONG_DURATION, payload: duration };
};
export const updateVolume = (masterVolume: number): Action<PlayerActionType.UPDATE_MASTER_VOLUME,number> => {
  return { type: PlayerActionType.UPDATE_MASTER_VOLUME, payload: masterVolume };
};
export const setStartingPlayer = (payload: boolean): Action<PlayerActionType.LOADING,boolean> => {
  return { type: PlayerActionType.LOADING, payload };
};
