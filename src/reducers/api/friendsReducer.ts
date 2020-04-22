import {
  Action,
  ActionType,
  FriendInterface,
  FriendReducerType
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
  [ActionType.GET_FRIENDS_API](state: FriendReducerType): FriendReducerType {
    return {
      ...state,
      loading: true
    };
  },
  [ActionType.GET_FRIENDS_API_SUCCESS](
    state: FriendReducerType,
    action: Action<FriendInterface[]>
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      friends: action.payload
    };
  },
  [ActionType.GET_FRIENDS_API_FAILURE](
    state: FriendReducerType,
    action: Action<string>
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload
    };
  },
  [ActionType.GET_FRIEND_API_SUCCESS](
    state: FriendReducerType,
    action: Action<{ data: FriendInterface }>
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      currentFriend: action.payload.data
    };
  },

  [ActionType.GET_FRIEND_API_FAILURE](
    state: FriendReducerType,
    action: Action<string>
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload
    };
  }
});
