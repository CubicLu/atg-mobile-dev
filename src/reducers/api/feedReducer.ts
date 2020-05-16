import {
  Action,
  FeedActionType,
  FeedReducerType,
  APIResponseInterface,
  APIErrorInterface
} from '../../models';
import createReducer from './../createReducer';

const defaultState: FeedReducerType = {
  posts: [],
  stories: [],
  currentCommunityArtist: null,
  loading: false,
  successMessage: null,
  errorMessage: null,
  currentPostComments: null,
  currentPostCover: { url: '' },
  queryResult: ''
};

export const feedReducer = createReducer<FeedReducerType>(defaultState, {
  [FeedActionType.GET_ALL_POSTS_API](state: FeedReducerType): FeedReducerType {
    return {
      ...state,
      queryResult: '',
      loading: true
    };
  },

  [FeedActionType.GET_ALL_POSTS_API_SUCCESS](
    state: FeedReducerType,
    action: Action<
      FeedActionType.GET_ALL_POSTS_API_SUCCESS,
      APIResponseInterface<string>
    >
  ): FeedReducerType {
    return {
      ...state,
      loading: false,
      queryResult: action.payload!.data
    };
  },

  [FeedActionType.GET_ALL_POSTS_API_FAILURE](
    state: FeedReducerType,
    action: Action<
      FeedActionType.GET_ALL_POSTS_API_FAILURE,
      APIErrorInterface<string>
    >
  ): FeedReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.message
    };
  }
});
