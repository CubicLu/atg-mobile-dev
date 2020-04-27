import {
  Action,
  ActionType,
  ArtistReducerType,
  GalleryIdInterface,
  GalleryImageIndexInterface
} from '../../interfaces';
import createReducer from './../createReducer';
import { transformGalleryToFlatArr } from '../../utils/normalizers';

const defaultState: ArtistReducerType = {
  artists: [],
  currentArtist: null,
  currentGallery: null,
  fullScreenImage: null,
  fullScreenImageIndex: 0,
  currentGalleryComments: [],
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
  },

  [ActionType.GET_ARTIST_GALLERY_COMMENTS_API](state: ArtistReducerType): any {
    return {
      ...state,
      loading: true
    };
  },

  [ActionType.GET_ARTIST_GALLERY_COMMENTS_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      currentGalleryComments: action.payload.data
    };
  },

  [ActionType.GET_ARTIST_GALLERY_COMMENTS_API_FAILURE](
    state: ArtistReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload
    };
  },

  [ActionType.SET_CURRENT_GALLERY](
    state: ArtistReducerType,
    action: Action<GalleryIdInterface>
  ): any {
    return {
      ...state,
      currentGallery: transformGalleryToFlatArr(
        state.currentArtist?.gallery?.[action.payload.galleryId]
      )
    };
  },
  [ActionType.SET_FULLSCREEN_IMAGE](
    state: ArtistReducerType,
    action: Action<GalleryImageIndexInterface>
  ): any {
    return {
      ...state,
      fullScreenImage:
        state.currentGallery?.[
          action.payload.index - 1 >= 0 ? action.payload.index : 0
        ]?.image,
      fullScreenImageIndex: action.payload?.index
    };
  },
  [ActionType.CLEAR_FULLSCREEN_IMAGE](state: ArtistReducerType): any {
    return {
      ...state,
      fullScreenImage: null,
      fullScreenImageIndex: 0
    };
  },
  [ActionType.CLEAR_CURRENT_GALLERY](state: ArtistReducerType): any {
    return {
      ...state,
      currentGallery: null
    };
  }
});
