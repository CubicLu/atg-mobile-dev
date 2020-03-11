import { Action, ActionType, ArtistReducerType } from './../../interfaces';
import createReducer from './../createReducer';
import {} from './../../components';

const defaultState: ArtistReducerType = {
  artists: [],
  current_artist: null,
  loading: false,
  success_message: null,
  error_message: null
};

export const artistReducer = createReducer<ArtistReducerType>(defaultState, {
  [ActionType.UPDATE_ARTIST_PROPERTY](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      [action.payload.property]: action.payload.value
    };
  },

  [ActionType.GET_ARTISTS_API](state: ArtistReducerType): any {
    return {
      ...state,
      loading: true
    };
  },

  [ActionType.GET_ARTISTS_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      artists: action.payload.data
    };
  },

  [ActionType.GET_ARTISTS_API_FAILURE](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      error_message: action.payload
    };
  },

  [ActionType.GET_ARTIST_API](state: ArtistReducerType): any {
    return {
      ...state,
      loading: true
    };
  },

  [ActionType.GET_ARTIST_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      current_artist: action.payload.data
    };
  },

  [ActionType.GET_ARTIST_API_FAILURE](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      error_message: action.payload
    };
  }
});
