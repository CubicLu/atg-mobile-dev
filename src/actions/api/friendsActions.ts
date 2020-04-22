import {
  ActionType,
  Action,
  FriendInterface,
  GetFriendAPIInterface
} from '../../interfaces';

export const getFriendsAPI = (): { type: ActionType } => ({
  type: ActionType.GET_FRIENDS_API
});

export const getFriendsAPIFailure = (error: string): Action<string> => ({
  type: ActionType.GET_FRIENDS_API_FAILURE,
  payload: error
});

export const getFriendsAPISuccess = (
  response: FriendInterface[]
): Action<FriendInterface[]> => ({
  type: ActionType.GET_FRIENDS_API_SUCCESS,
  payload: response
});

export const getFriendAPI = (
  friendId: string
): Action<GetFriendAPIInterface> => ({
  type: ActionType.GET_FRIEND_API,
  payload: { friendId }
});

export const getCurrentFriendAPISuccess = (response: {
  data: FriendInterface;
}): Action<{ data: FriendInterface }> => ({
  type: ActionType.GET_FRIEND_API_SUCCESS,
  payload: response
});

export const getCurrentFriendAPIFailure = (error: string): Action<string> => ({
  type: ActionType.GET_FRIEND_API_FAILURE,
  payload: error
});
