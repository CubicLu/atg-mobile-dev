import { ActionType, SongInterface } from '../interfaces';

export const togglePlayer = (): any => {
  return { type: ActionType.TOGGLE_PLAYER };
};
export const setPlaylistPlayer = (): any => {
  return { type: ActionType.SET_PLAYLIST_PLAYER };
};
export const setRadioPlaylistPlayer = (): any => {
  return { type: ActionType.SET_RADIO_PLAYER };
};
export const toggleShuffle = (): any => {
  return { type: ActionType.TOGGLE_SHUFFLE_PLAYER };
};
export const toggleRepeat = (): any => {
  return { type: ActionType.TOGGLE_REPEAT_PLAYER };
};
export const favoriteSong = (): any => {
  return { type: ActionType.FAVORITE_SONG };
};
export const playSong = (song: SongInterface): any => {
  return { type: ActionType.PLAY_SONG, song };
};
export const pauseSong = (): any => {
  return { type: ActionType.PAUSE_SONG };
};
export const nextSong = (): any => {
  return { type: ActionType.NEXT_SONG };
};
export const prevSong = (): any => {
  return { type: ActionType.PREV_SONG };
};
export const stopSong = (): any => {
  return { type: ActionType.STOP_SONG };
};
export const resumeSong = (): any => {
  return { type: ActionType.RESUME_SONG };
};
export const updateElapsed = (time: number): any => {
  return { type: ActionType.UPDATE_ELAPSED_SONG, timeElapsed: time };
};

// export const fetchSongsSuccess = (songs) => {
//   return {
//     type: ActionType.FETCH_SONGS_SUCCESS,
//     songs
//   };
// };
