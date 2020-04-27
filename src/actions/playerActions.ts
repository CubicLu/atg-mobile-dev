import {
  ActionType,
  PlaylistInterface,
  SongInterface,
  Action,
  SingleAction,
  SeekPositionInteface,
  SetPlaylistInterface,
  PlaySongInterface
} from '../interfaces';

export const togglePlayer = (): SingleAction => {
  return { type: ActionType.TOGGLE_PLAYER };
};
export const toggleShuffle = (): SingleAction => {
  return { type: ActionType.TOGGLE_SHUFFLE_PLAYER };
};
export const toggleRepeat = (): SingleAction => {
  return { type: ActionType.TOGGLE_REPEAT_PLAYER };
};
export const favoriteSong = (): SingleAction => {
  return { type: ActionType.FAVORITE_SONG };
};
export const toggleNextSong = (): SingleAction => {
  return { type: ActionType.TOGGLE_CURRENT_NEXT_SONG };
};
export const pauseSong = (): SingleAction => {
  return { type: ActionType.PAUSE_SONG };
};
export const nextSong = (): SingleAction => {
  return { type: ActionType.NEXT_SONG };
};
export const prevSong = (): SingleAction => {
  return { type: ActionType.PREV_SONG };
};
export const stopSong = (): SingleAction => {
  return { type: ActionType.STOP_SONG };
};
export const resumeSong = (): SingleAction => {
  return { type: ActionType.RESUME_SONG };
};

export const setPlaylist = (
  playlist: PlaylistInterface,
  song: SongInterface
): Action<SetPlaylistInterface> => {
  return { type: ActionType.SET_PLAYLIST, payload: { playlist, song } };
};
export const playSong = (
  song: SongInterface,
  nextSong?: SongInterface
): Action<PlaySongInterface> => {
  return { type: ActionType.PLAY_SONG, payload: { song, nextSong } };
};
export const loadNextSong = (payload: SongInterface): Action<SongInterface> => {
  return { type: ActionType.LOAD_NEXT_SONG, payload };
};
export const seekSongPosition = (
  seekTo: number,
  increase: boolean = false
): Action<SeekPositionInteface> => {
  return { type: ActionType.SEEK_TO_SONG, payload: { seekTo, increase } };
};
export const updateElapsed = (timeElapsed: number): Action<number> => {
  return { type: ActionType.UPDATE_ELAPSED_SONG, payload: timeElapsed };
};
export const updateDuration = (duration: number): Action<number> => {
  return { type: ActionType.UPDATE_SONG_DURATION, payload: duration };
};
export const updateVolume = (masterVolume: number): Action<number> => {
  return { type: ActionType.UPDATE_MASTER_VOLUME, payload: masterVolume };
};
export const setStartingPlayer = (payload: boolean): Action<boolean> => {
  return { type: ActionType.LOADING_PLAYER, payload };
};
