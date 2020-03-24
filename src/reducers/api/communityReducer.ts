import { Action, ActionType, CommunityReducerType } from './../../interfaces';
import createReducer from './../createReducer';
import {} from './../../components';

const defaultState: CommunityReducerType = {
  posts: [],
  loading: false,
  successMessage: null,
  errorMessage: null
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
    }
  }
);
