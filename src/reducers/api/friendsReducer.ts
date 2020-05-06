import {
  Action,
  FriendActionType,
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
  [FriendActionType.GET_ALL_API](state: FriendReducerType): FriendReducerType {
    return {
      ...state,
      loading: true
    };
  },
  [FriendActionType.GET_ALL_API_SUCCESS](
    state: FriendReducerType,
    action: Action<FriendInterface[]>
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      friends: action.payload
    };
  },
  [FriendActionType.GET_ALL_API_FAILURE](
    state: FriendReducerType,
    action: Action<string>
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload
    };
  },
  [FriendActionType.GET_BY_ID_API](
    state: FriendReducerType,
    action: Action<{ data: FriendInterface }>
  ): FriendReducerType {
    return {
      ...state,
      loading: false,
      currentFriend: action.payload.data
    };
  },

  [FriendActionType.GET_BY_ID_API_FAILURE](
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
