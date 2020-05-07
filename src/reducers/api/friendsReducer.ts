import {
  Action,
  FriendActionType,
  FriendInterface,
  FriendReducerType,
  APIResponseInterface,
  APIErrorInterface
} from '../../interfaces';
import createReducer from './../createReducer';

const defaultState: FriendReducerType = {
  friends: [],
  currentFriend: null,
  loading: false,
  successMessage: null,
  errorMessage: null
};

export const friendReducer = createReducer<FriendReducerType>(defaultState, {
  [FriendActionType.GET_FRIENDS_ALL_API](
    state: FriendReducerType
  ): FriendReducerType {
    return {
      ...state,
      loading: true
    };
  },
  [FriendActionType.GET_FRIENDS_ALL_API_SUCCESS](
    state: FriendReducerType,
    action: Action<
      FriendActionType.GET_FRIENDS_ALL_API_SUCCESS,
      APIResponseInterface<{ data: FriendInterface[] }>
    >
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      friends: action.payload!.data.data
    };
  },
  [FriendActionType.GET_FRIENDS_ALL_API_FAILURE](
    state: FriendReducerType,
    action: Action<
      FriendActionType.GET_FRIENDS_ALL_API_FAILURE,
      APIErrorInterface<string>
    >
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.message
    };
  },
  [FriendActionType.GET_FRIEND_BY_ID_API](
    state: FriendReducerType
  ): FriendReducerType {
    return {
      ...state,
      loading: true
    };
  },
  [FriendActionType.GET_FRIEND_BY_ID_API_SUCCESS](
    state: FriendReducerType,
    action: Action<
      FriendActionType.GET_FRIEND_BY_ID_API_SUCCESS,
      APIResponseInterface<{ data: FriendInterface }>
    >
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      currentFriend: action.payload!.data.data
    };
  },

  [FriendActionType.GET_FRIEND_BY_ID_API_FAILURE](
    state: FriendReducerType,
    action: Action<
      FriendActionType.GET_FRIEND_BY_ID_API_FAILURE,
      APIErrorInterface<string>
    >
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload!.message
    };
  }
});
