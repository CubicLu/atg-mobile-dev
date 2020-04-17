import { Action, ActionType, FeedReducerType } from '../../interfaces';
import createReducer from './../createReducer';

const defaultState: FeedReducerType = {
  posts: [],
  stories: [],
  currentCommunityArtist: null,
  loading: false,
  successMessage: null,
  errorMessage: null,
  currentPostComments: null,
  currentPostCover: { url: '' }
};

export const feedReducer = createReducer<FeedReducerType>(defaultState, {
  [ActionType.GET_FEED_POSTS_API](state: FeedReducerType): any {
    return {
      ...state,
      loading: true
    };
  },

  [ActionType.GET_FEED_POSTS_API_SUCCESS](
    state: FeedReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      queryResult: action.payload.data
    };
  },

  [ActionType.GET_FEED_POSTS_API_FAILURE](
    state: FeedReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload
    };
  }
});
