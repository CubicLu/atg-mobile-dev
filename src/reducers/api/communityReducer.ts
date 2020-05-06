import { Action, CommunityActionType, CommunityReducerType, ActionProperty, APIResponseInterface, APIErrorInterface } from './../../interfaces';
import createReducer from './../createReducer';

const defaultState: CommunityReducerType = {
  posts: [],
  stories: [],
  currentCommunityArtist: null,
  loading: false,
  successMessage: null,
  errorMessage: null,
  currentPostComments: null,
  currentPostCover: { url: '' }
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

    [CommunityActionType.GET_POSTS_API](state: CommunityReducerType): CommunityReducerType {
      return {
        ...state,
        loading: true
      };
    },

    [CommunityActionType.GET_POSTS_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<CommunityActionType.GET_POSTS_API_SUCCESS, APIResponseInterface<any>>
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        posts: action.payload!.response.data
      };
    },

    [CommunityActionType.GET_POSTS_API_FAILURE](
      state: CommunityReducerType,
      action: Action<CommunityActionType.GET_POSTS_API_FAILURE, APIErrorInterface<any>>
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.response.data
      };
    },

    [CommunityActionType.GET_BY_ARTIST_USERNAME_API](
      state: CommunityReducerType
    ): CommunityReducerType {
      return {
        ...state,
        loading: true
      };
    },

    [CommunityActionType.GET_BY_ARTIST_USERNAME_API_SUCCESS](
      state: CommunityReducerType,
      action:  Action<CommunityActionType.GET_BY_ARTIST_USERNAME_API_SUCCESS, APIResponseInterface<any>>
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        posts: action.payload!.response.data.posts,
        stories: action.payload!.response.data.stories,
        currentCommunityArtist: {
          name: action.payload!.response.data.name,
          fullname: action.payload!.response.data.fullname,
          username: action.payload!.response.data.username,
          backgroundGradient: action.payload!.response.data.backgroundGradient
            ? action.payload!.response.data.backgroundGradient
            : null
        }
      };
    },

    [CommunityActionType.GET_BY_ARTIST_USERNAME_API_FAILURE](
      state: CommunityReducerType,
      action: Action<CommunityActionType.GET_BY_ARTIST_USERNAME_API_FAILURE, APIErrorInterface<any>>
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.response.data
      };
    },

    [CommunityActionType.GET_STORIES_API](state: CommunityReducerType): any {
      return {
        ...state,
        loading: true
      };
    },

    [CommunityActionType.GET_STORIES_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<CommunityActionType.GET_STORIES_API_SUCCESS, APIResponseInterface<any>>
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        stories: action.payload!.response.data
      };
    },

    [CommunityActionType.GET_STORIES_API_FAILURE](
      state: CommunityReducerType,
      action: Action<CommunityActionType.GET_STORIES_API_FAILURE, APIErrorInterface<any>>
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.response.data
      };
    },

    [CommunityActionType.GET_COMMENTARIES_API](
      state: CommunityReducerType
    ): CommunityReducerType {
      return {
        ...state,
        loading: true
      };
    },
    [CommunityActionType.GET_COMMENTARIES_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<CommunityActionType.GET_COMMENTARIES_API_SUCCESS, APIResponseInterface<any>>
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        currentPostComments: action.payload!.response.data
      };
    },
    [CommunityActionType.GET_COMMENTARIES_API_FAILURE](
      state: CommunityReducerType,
      action: Action<CommunityActionType.GET_COMMENTARIES_API_FAILURE, APIErrorInterface<any>>
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.response.data
      };
    },

    [CommunityActionType.GET_COMMENTARIES_COVER_API](
      state: CommunityReducerType
    ): CommunityReducerType {
      return {
        ...state,
        loading: true
      };
    },
    [CommunityActionType.GET_COMMENTARIES_COVER_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<CommunityActionType.GET_COMMENTARIES_COVER_API_SUCCESS, APIResponseInterface<any>>
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        currentPostCover: action.payload!.response.data
      };
    },
    [CommunityActionType.GET_COMMENTARIES_COVER_API_FAILURE](
      state: CommunityReducerType,
      action: Action<CommunityActionType.GET_COMMENTARIES_COVER_API_FAILURE, APIErrorInterface<any>>
    ): CommunityReducerType {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload!.response.data
      };
    }
  }
);
