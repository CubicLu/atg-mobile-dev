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
} from '../../models';
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
  event: null,
  supportLevels: [],
  videos: null,
  artist: null
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
    action: Action<
      ArtistActionType.GET_ALL_API_SUCCESS,
      APIResponseInterface<ArtistInterface[]>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      artists: action.payload!.data
    };
  },

  [ArtistActionType.GET_ALL_API_FAILURE](
    state: ArtistReducerType,
    action: Action<
      ArtistActionType.GET_ALL_API_FAILURE,
      APIErrorInterface<string>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.message
    };
  },

  [ArtistActionType.GET_BY_ID_API](
    state: ArtistReducerType
  ): ArtistReducerType {
    return {
      ...state,
      loading: true
    };
  },

  [ArtistActionType.GET_BY_ID_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<
      ArtistActionType.GET_BY_ID_API_SUCCESS,
      APIResponseInterface<ArtistInterface>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      currentArtist: action.payload!.data,
      artist: action.payload!.data
    };
  },

  [ArtistActionType.CLEAR_CURRENT_ARTIST](
    state: ArtistReducerType
  ): ArtistReducerType {
    return {
      ...state,
      currentArtist: null
    };
  },

  [ArtistActionType.GET_BY_ID_API_FAILURE](
    state: ArtistReducerType,
    action: Action<
      ArtistActionType.GET_BY_ID_API_FAILURE,
      APIErrorInterface<string>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.message
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
    action: Action<
      ArtistActionType.GET_EVENT_API_SUCCESS,
      APIResponseInterface<any>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      event: action.payload!.data
    };
  },

  [ArtistActionType.GET_EVENT_API_FAILURE](
    state: ArtistReducerType,
    action: Action<
      ArtistActionType.GET_EVENT_API_FAILURE,
      APIErrorInterface<any>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.message
    };
  },

  [ArtistActionType.GET_VIDEO_API](
    state: ArtistReducerType
  ): ArtistReducerType {
    return {
      ...state,
      loading: true
    };
  },

  [ArtistActionType.GET_VIDEO_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<
      ArtistActionType.GET_VIDEO_API_SUCCESS,
      APIResponseInterface<any>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      videos: action.payload!.data
    };
  },

  [ArtistActionType.GET_VIDEO_API_FAILURE](
    state: ArtistReducerType,
    action: Action<
      ArtistActionType.GET_VIDEO_API_FAILURE,
      APIErrorInterface<any>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.message
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
    action: Action<
      ArtistActionType.GET_GALLERY_COMMENTS_API_SUCCESS,
      APIResponseInterface<any>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      currentGalleryComments: action.payload!.data
    };
  },

  [ArtistActionType.GET_GALLERY_COMMENTS_API_FAILURE](
    state: ArtistReducerType,
    action: Action<
      ArtistActionType.GET_GALLERY_COMMENTS_API_FAILURE,
      APIErrorInterface<any>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.message
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
    action: Action<
      ArtistActionType.SET_FULLSCREEN_IMAGE,
      GalleryImageIndexInterface
    >
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
  [ArtistActionType.CLEAR_FULLSCREEN_IMAGE](
    state: ArtistReducerType
  ): ArtistReducerType {
    return {
      ...state,
      fullScreenImage: null,
      fullScreenImageIndex: 0
    };
  },
  [ArtistActionType.CLEAR_CURRENT_GALLERY](
    state: ArtistReducerType
  ): ArtistReducerType {
    return {
      ...state,
      currentGallery: null
    };
  },
  [ArtistActionType.GET_SUPPORT_LEVELS_API](
    state: ArtistReducerType
  ): ArtistReducerType {
    return {
      ...state,
      loading: true
    };
  },

  [ArtistActionType.GET_SUPPORT_LEVELS_API_SUCCESS](
    state: ArtistReducerType,
    action: Action<
      ArtistActionType.GET_SUPPORT_LEVELS_API_SUCCESS,
      APIResponseInterface<any>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      supportLevels: action.payload!.data
    };
  },

  [ArtistActionType.GET_SUPPORT_LEVELS_API_FAILURE](
    state: ArtistReducerType,
    action: Action<
      ArtistActionType.GET_SUPPORT_LEVELS_API_FAILURE,
      APIErrorInterface<any>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.message
    };
  },
  [ArtistActionType.POST_SUBSCRIBE_API](
    state: ArtistReducerType
  ): ArtistReducerType {
    return {
      ...state,
      loading: true
    };
  },
  [ArtistActionType.POST_SUBSCRIBE_API_SUCCESS](
    state: ArtistReducerType
  ): ArtistReducerType {
    return {
      ...state,
      loading: false
    };
  },

  [ArtistActionType.POST_SUBSCRIBE_API_FAILURE](
    state: ArtistReducerType,
    action: Action<
      ArtistActionType.POST_SUBSCRIBE_API_FAILURE,
      APIErrorInterface<any>
    >
  ): ArtistReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.message
    };
  }
});
