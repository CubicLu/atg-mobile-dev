import { ActionType, PlaylistInterface, SongInterface } from '../interfaces';

export const togglePlayer = (): PlayerAction => {
  return { type: ActionType.TOGGLE_PLAYER };
};
export const setPlaylist = (
  playlist: PlaylistInterface,
  song?: SongInterface
): any => {
  return { type: ActionType.SET_PLAYLIST, playlist, song };
};
export const toggleShuffle = (): PlayerAction => {
  return { type: ActionType.TOGGLE_SHUFFLE_PLAYER };
};
export const toggleRepeat = (): PlayerAction => {
  return { type: ActionType.TOGGLE_REPEAT_PLAYER };
};
export const favoriteSong = (): PlayerAction => {
  return { type: ActionType.FAVORITE_SONG };
};
export const toggleNextSong = (): PlayerAction => {
  return { type: ActionType.TOGGLE_CURRENT_NEXT_SONG };
};
export const setBufferingPlayer = (): PlayerAction => {
  return { type: ActionType.LOADING_PLAYER };
};
export const fadingOutSong = (fadingOut: boolean = true): any => {
  return { type: ActionType.FADING_OUT_SONG, fadingOut };
};
export const playSong = (song: SongInterface, next?: SongInterface): any => {
  return { type: ActionType.PLAY_SONG, song, nextSong: next };
};
export const loadNextSong = (nextSong: SongInterface): any => {
  return { type: ActionType.LOAD_NEXT_SONG, nextSong };
};
export const pauseSong = (): PlayerAction => {
  return { type: ActionType.PAUSE_SONG };
};
export const nextSong = (): PlayerAction => {
  return { type: ActionType.NEXT_SONG };
};
export const prevSong = (): PlayerAction => {
  return { type: ActionType.PREV_SONG };
};
export const stopSong = (): PlayerAction => {
  return { type: ActionType.STOP_SONG };
};
export const resumeSong = (): PlayerAction => {
  return { type: ActionType.RESUME_SONG };
};
export const seekSongPosition = (seekTo: number): any => {
  return { type: ActionType.SEEK_TO_SONG, seekTo };
};
export const updateElapsed = (timeElapsed: number): any => {
  return { type: ActionType.UPDATE_ELAPSED_SONG, timeElapsed };
};
export const updateDuration = (duration: number): any => {
  return { type: ActionType.UPDATE_SONG_DURATION, duration };
};
export const updateVolume = (masterVolume: number): any => {
  return { type: ActionType.UPDATE_MASTER_VOLUME, masterVolume };
};
export const setPlayerAction = (playerAction: string): any => {
  return { type: ActionType.ACTION_PLAYER, playerAction };
};

interface PlayerAction {
  type: string;
}
