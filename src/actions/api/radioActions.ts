import { ActionType } from '../../interfaces';

export const getRadioArtistAPI = (query: string): any => ({
  type: ActionType.GET_RADIO_ARTIST,
  payload: { query }
});

export const getRadioArtistAPISuccess = (response): any => ({
  type: ActionType.GET_RADIO_ARTIST_SUCCESS,
  payload: response
});

export const getRadioArtistAPIFailure = (error): any => ({
  type: ActionType.GET_RADIO_ARTIST_FAILURE,
  payload: error
});
