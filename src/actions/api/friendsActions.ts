import {
  FriendActionType,
  Action,
  FriendInterface,
  APIErrorInterface,
  APIResponseInterface
} from '../../interfaces';

export const getFriendsAPI = (): Action<FriendActionType.GET_FRIENDS_ALL_API> => ({
  type: FriendActionType.GET_FRIENDS_ALL_API
});

export const getFriendsAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  FriendActionType.GET_FRIENDS_ALL_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: FriendActionType.GET_FRIENDS_ALL_API_FAILURE,
  payload: error
});

export const getFriendsAPISuccess = (
  response: APIResponseInterface<FriendInterface[]>
): Action<
  FriendActionType.GET_FRIENDS_ALL_API_SUCCESS,
  APIResponseInterface<FriendInterface[]>
> => ({
  type: FriendActionType.GET_FRIENDS_ALL_API_SUCCESS,
  payload: response
});

export const getFriendAPI = (
  friendId: string
): Action<FriendActionType.GET_FRIEND_BY_ID_API, { friendId: string }> => ({
  type: FriendActionType.GET_FRIEND_BY_ID_API,
  payload: { friendId }
});

export const getCurrentFriendAPISuccess = (
  response: APIResponseInterface<FriendInterface>
): Action<
  FriendActionType.GET_FRIEND_BY_ID_API_SUCCESS,
  APIResponseInterface<FriendInterface>
> => ({
  type: FriendActionType.GET_FRIEND_BY_ID_API_SUCCESS,
  payload: response
});

export const getCurrentFriendAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  FriendActionType.GET_FRIEND_BY_ID_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: FriendActionType.GET_FRIEND_BY_ID_API_FAILURE,
  payload: error
});
