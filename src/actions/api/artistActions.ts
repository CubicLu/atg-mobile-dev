import { ActionType } from './../../interfaces';

export const updateArtistProperty = (property: string, value: any): any => ({
  type: ActionType.UPDATE_ARTIST_PROPERTY,
  payload: { property, value }
});

export const getArtistsAPI = (): any => ({
  type: ActionType.GET_ARTISTS_API
});

export const getArtistsAPIFailure = (error): any => ({
  type: ActionType.GET_ARTISTS_API_FAILURE,
  payload: error
});

export const getArtistsAPISuccess = (response): any => ({
  type: ActionType.GET_ARTISTS_API_SUCCESS,
  payload: response
});

export const getArtistAPI = (username: string): any => ({
  type: ActionType.GET_ARTIST_API,
  payload: username
});

export const getArtistAPIFailure = (error): any => ({
  type: ActionType.GET_ARTIST_API_FAILURE,
  payload: error
});

export const getArtistAPISuccess = (response): any => ({
  type: ActionType.GET_ARTIST_API_SUCCESS,
  payload: response
});
