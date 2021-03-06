import {
  Action,
  CommunityActionType,
  CommunityReducerType,
  ActionProperty,
  APIResponseInterface,
  APIErrorInterface
} from './../../models';
import createReducer from './../createReducer';

const defaultState: CommunityReducerType = {
  posts: [],
  stories: [],
  currentCommunityArtist: null,
  loading: false,
  successMessage: null,
  errorMessage: null,
  currentPostComments: null,
  currentPostCover: { url: '' },
  commentsList: []
};

export const communityReducer = createReducer<CommunityReducerType>(
  defaultState,
  {
    [CommunityActionType.UPDATE_PROPERTY](
      state: CommunityReducerType,
      action: Action<CommunityActionType.UPDATE_PROPERTY, ActionProperty<any>>
    ): CommunityReducerType {
      return {
        ...state,
        [action.payload!.property]: action.payload!.value
      };
    },

    [CommunityActionType.UPDATE_SET_INITIAL_PROPERTY](
      state: CommunityReducerType,
      action: Action<CommunityActionType.UPDATE_SET_INITIAL_PROPERTY, string>
    ): CommunityReducerType {
      return {
        ...state,
        [action.payload!]: defaultState[action.payload!]
      };
    },

    [CommunityActionType.GET_POSTS_API](
      state: CommunityReducerType
    ): CommunityReducerType {
      return {
        ...state,
        posts: [],
        loading: true
      };
    },

    [CommunityActionType.GET_POSTS_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<
        CommunityActionType.GET_POSTS_API_SUCCESS,
        APIResponseInterface<any>
      >
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        posts: action.payload!.data
      };
    },

    [CommunityActionType.GET_POSTS_API_FAILURE](
      state: CommunityReducerType,
      action: Action<
        CommunityActionType.GET_POSTS_API_FAILURE,
        APIErrorInterface<any>
      >
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.message
      };
    },

    [CommunityActionType.GET_BY_ARTIST_USERNAME_API](
      state: CommunityReducerType
    ): CommunityReducerType {
      return {
        ...state,
        currentCommunityArtist: null,
        loading: true
      };
    },

    [CommunityActionType.GET_BY_ARTIST_USERNAME_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<
        CommunityActionType.GET_BY_ARTIST_USERNAME_API_SUCCESS,
        APIResponseInterface<any>
      >
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        currentCommunityArtist: action.payload!.data
      };
    },

    [CommunityActionType.GET_BY_ARTIST_USERNAME_API_FAILURE](
      state: CommunityReducerType,
      action: Action<
        CommunityActionType.GET_BY_ARTIST_USERNAME_API_FAILURE,
        APIErrorInterface<any>
      >
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.message
      };
    },

    [CommunityActionType.GET_STORIES_API](state: CommunityReducerType): any {
      return {
        ...state,
        stories: [],
        loading: true
      };
    },

    [CommunityActionType.GET_STORIES_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<
        CommunityActionType.GET_STORIES_API_SUCCESS,
        APIResponseInterface<any>
      >
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        stories: action.payload!.data
      };
    },

    [CommunityActionType.GET_STORIES_API_FAILURE](
      state: CommunityReducerType,
      action: Action<
        CommunityActionType.GET_STORIES_API_FAILURE,
        APIErrorInterface<any>
      >
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.message
      };
    },

    [CommunityActionType.GET_COMMENTARIES_API](
      state: CommunityReducerType
    ): CommunityReducerType {
      return {
        ...state,
        currentPostComments: [],
        loading: true
      };
    },
    [CommunityActionType.GET_COMMENTARIES_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<
        CommunityActionType.GET_COMMENTARIES_API_SUCCESS,
        APIResponseInterface<any>
      >
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        currentPostComments: action.payload!.data
      };
    },
    [CommunityActionType.GET_COMMENTARIES_API_FAILURE](
      state: CommunityReducerType,
      action: Action<
        CommunityActionType.GET_COMMENTARIES_API_FAILURE,
        APIErrorInterface<any>
      >
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.message
      };
    },

    [CommunityActionType.GET_COMMENTARIES_COVER_API](
      state: CommunityReducerType
    ): CommunityReducerType {
      return {
        ...state,
        currentPostCover: { url: '' },
        loading: true
      };
    },
    [CommunityActionType.GET_COMMENTARIES_COVER_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<
        CommunityActionType.GET_COMMENTARIES_COVER_API_SUCCESS,
        APIResponseInterface<any>
      >
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        currentPostCover: action.payload!.data
      };
    },
    [CommunityActionType.GET_COMMENTARIES_COVER_API_FAILURE](
      state: CommunityReducerType,
      action: Action<
        CommunityActionType.GET_COMMENTARIES_COVER_API_FAILURE,
        APIErrorInterface<any>
      >
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.message
      };
    },

    [CommunityActionType.GET_COMMUNITY_RECENT_POSTS_API](
      state: CommunityReducerType
    ): any {
      return {
        ...state,
        commentsList: [],
        loading: true
      };
    },

    [CommunityActionType.GET_COMMUNITY_RECENT_POSTS_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        commentsList: action.payload.data
      };
    },

    [CommunityActionType.GET_COMMUNITY_RECENT_POSTS_API_FAILURE](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    }
  }
);
