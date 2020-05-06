import {
  Action,
  ArtistActionType,
  ArtistReducerType,
  GalleryIdInterface,
  GalleryImageIndexInterface,
  APIErrorInterface,
  APIResponseInterface,
  ArtistInterface,
  ActionProperty
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
  [ArtistActionType.UPDATE_PROPERTY](
    state: ArtistReducerType,
    action: Action<ArtistActionType.UPDATE_PROPERTY, ActionProperty<any>>
  ): ArtistReducerType {
    return {
      ...state,
      [action.payload!.property]: action.payload!.value
    };
  },

  [ArtistActionType.UPDATE_SET_INITIAL_PROPERTY](
    state: ArtistReducerType,
    action: Action<ArtistActionType.UPDATE_SET_INITIAL_PROPERTY>
  ): ArtistReducerType {
    return {
      ...state,
      [action.payload]: defaultState[action.payload]
    };
  },

  [ArtistActionType.GET_ALL_API](state: ArtistReducerType): ArtistReducerType {
    return {
      ...state,
      loading: true
    };
  },

  [ArtistActionType.GET_ALL_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<ArtistActionType.GET_ALL_API_SUCCESS, APIResponseInterface<ArtistInterface[]>>
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      artists: action.payload!.response.data
    };
  },

  [ArtistActionType.GET_ALL_API_FAILURE](
    state: ArtistReducerType,
    action: Action<ArtistActionType.GET_ALL_API_FAILURE, APIErrorInterface<string>>
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.response.data
    };
  },

  [ArtistActionType.GET_BY_USERNAME_API](state: ArtistReducerType): ArtistReducerType {
    return {
      ...state,
      loading: true
    };
  },

  [ArtistActionType.GET_BY_USERNAME_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<ArtistActionType.GET_BY_USERNAME_API_SUCCESS, APIResponseInterface<ArtistInterface>>
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      currentArtist: action.payload!.response.data
    };
  },

  [ArtistActionType.GET_BY_USERNAME_API_FAILURE](
    state: ArtistReducerType,
    action: Action<ArtistActionType.GET_BY_USERNAME_API_FAILURE, APIErrorInterface<string>>
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.response.data
    };
  },

  [ArtistActionType.GET_EVENT_API](
    state: ArtistReducerType
  ): ArtistReducerType {
    return {
      ...state,
      loading: true
    };
  },

  [ArtistActionType.GET_EVENT_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<ArtistActionType.GET_EVENT_API_SUCCESS, APIResponseInterface<any>>
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      event: action.payload!.response.data
    };
  },

  [ArtistActionType.GET_EVENT_API_FAILURE](
    state: ArtistReducerType,
    action: Action<ArtistActionType.GET_EVENT_API_FAILURE, APIErrorInterface<any>>
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.response.data
    };
  },

  [ArtistActionType.GET_GALLERY_COMMENTS_API](
    state: ArtistReducerType
  ): ArtistReducerType {
    return {
      ...state,
      loading: true
    };
  },

  [ArtistActionType.GET_GALLERY_COMMENTS_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<ArtistActionType.GET_GALLERY_COMMENTS_API_SUCCESS, APIResponseInterface<any>>
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      currentGalleryComments: action.payload!.response.data
    };
  },

  [ArtistActionType.GET_GALLERY_COMMENTS_API_FAILURE](
    state: ArtistReducerType,
    action: Action<ArtistActionType.GET_GALLERY_COMMENTS_API_FAILURE, APIErrorInterface<any>>
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.response.data
    };
  },

  [ArtistActionType.SET_CURRENT_GALLERY](
    state: ArtistReducerType,
    action: Action<ArtistActionType.SET_CURRENT_GALLERY, GalleryIdInterface>
  ): any {
    return {
      ...state,
      currentGallery: transformGalleryToFlatArr(
        state.currentArtist?.gallery?.[action.payload!.galleryId]
      )
    };
  },
  [ArtistActionType.SET_FULLSCREEN_IMAGE](
    state: ArtistReducerType,
    action: Action<ArtistActionType.SET_FULLSCREEN_IMAGE, GalleryImageIndexInterface>
  ): any {
    return {
      ...state,
      fullScreenImage:
        state.currentGallery?.[
          action.payload!.index - 1 >= 0 ? action.payload!.index : 0
        ]?.image,
      fullScreenImageIndex: action.payload?.index
    };
  },
  [ArtistActionType.CLEAR_FULLSCREEN_IMAGE](state: ArtistReducerType): ArtistReducerType {
    return {
      ...state,
      fullScreenImage: null,
      fullScreenImageIndex: 0
    };
  },
  [ArtistActionType.CLEAR_CURRENT_GALLERY](state: ArtistReducerType): ArtistReducerType {
    return {
      ...state,
      currentGallery: null
    };
  }
});
