import { Action, ActionType, ArtistReducerType } from './../../interfaces';
import createReducer from './../createReducer';

const defaultState: ArtistReducerType = {
  artists: [],
  currentArtist: null,
  loading: false,
  successMessage: null,
  errorMessage: null,
  event: null
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

  [ActionType.UPDATE_ARTIST_SET_INITIAL_PROPERTY](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      [action.payload]: defaultState[action.payload]
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
      errorMessage: action.payload
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
      currentArtist: action.payload.data
    };
  },

  [ActionType.GET_ARTIST_API_FAILURE](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload
    };
  },

  [ActionType.GET_ARTIST_EVENT_API](state: ArtistReducerType): any {
    return {
      ...state,
      loading: true
    };
  },

  [ActionType.GET_ARTIST_EVENT_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      event: action.payload.data
    };
  },

  [ActionType.GET_ARTIST_EVENT_API_FAILURE](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload
    };
  }
});
