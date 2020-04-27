import { Action, ActionType, CommunityReducerType } from './../../interfaces';
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
    [ActionType.UPDATE_COMMUNITY_PROPERTY](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        [action.payload.property]: action.payload.value
      };
    },

    [ActionType.UPDATE_COMMUNITY_SET_INITIAL_PROPERTY](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        [action.payload]: defaultState[action.payload]
      };
    },

    [ActionType.GET_COMMUNITY_POSTS_API](state: CommunityReducerType): any {
      return {
        ...state,
        loading: true
      };
    },

    [ActionType.GET_COMMUNITY_POSTS_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        posts: action.payload.data
      };
    },

    [ActionType.GET_COMMUNITY_POSTS_API_FAILURE](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    },

    [ActionType.GET_COMMUNITY_BY_ARTIST_USERNAME_API](
      state: CommunityReducerType
    ): any {
      return {
        ...state,
        loading: true
      };
    },

    [ActionType.GET_COMMUNITY_BY_ARTIST_USERNAME_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        posts: action.payload.data.posts,
        stories: action.payload.data.stories,
        currentCommunityArtist: {
          name: action.payload.data.name,
          fullname: action.payload.data.fullname,
          username: action.payload.data.username,
          backgroundGradient: action.payload.data.backgroundGradient
            ? action.payload.data.backgroundGradient
            : null
        }
      };
    },

    [ActionType.GET_COMMUNITY_BY_ARTIST_USERNAME_API_FAILURE](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    },

    [ActionType.GET_COMMUNITY_STORIES_API](state: CommunityReducerType): any {
      return {
        ...state,
        loading: true
      };
    },

    [ActionType.GET_COMMUNITY_STORIES_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        stories: action.payload.data
      };
    },

    [ActionType.GET_COMMUNITY_STORIES_API_FAILURE](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    },

    [ActionType.GET_COMMUNITY_COMMENTARIES_API](
      state: CommunityReducerType
    ): any {
      return {
        ...state,
        loading: true
      };
    },
    [ActionType.GET_COMMUNITY_COMMENTARIES_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        currentPostComments: action.payload.data
      };
    },
    [ActionType.GET_COMMUNITY_COMMENTARIES_API_FAILURE](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.data
      };
    },

    [ActionType.GET_COMMUNITY_COMMENTARIES_COVER_API](
      state: CommunityReducerType
    ): any {
      return {
        ...state,
        loading: true
      };
    },
    [ActionType.GET_COMMUNITY_COMMENTARIES_COVER_API_SUCCESS](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        currentPostCover: action.payload.data
      };
    },
    [ActionType.GET_COMMUNITY_COMMENTARIES_COVER_API_FAILURE](
      state: CommunityReducerType,
      action: Action<any>
    ): any {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.data
      };
    }
  }
);
