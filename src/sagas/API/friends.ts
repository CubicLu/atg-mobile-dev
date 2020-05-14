import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import { FriendActionType, FriendInterface } from '../../models';
import {
  getFriendsAPIFailure,
  getFriendsAPISuccess,
  getCurrentFriendAPISuccess,
  getCurrentFriendAPIFailure
} from '../../actions/api/friendsActions';

export const getFriendsRequest = async (): Promise<FriendInterface[]> =>
  await API.get(`profile/friends.json?${new Date().getTime()}`);

function* getFriendsAPI(): any {
  try {
    const request = yield call(getFriendsRequest);
    yield put(getFriendsAPISuccess(request));
  } catch (error) {
    yield put(getFriendsAPIFailure(error));
  }
}
export function* getFriends(): any {
  yield takeEvery(FriendActionType.GET_FRIENDS_ALL_API, getFriendsAPI);
}

function* getCurrentFriendAPI({ payload: { friendId } }: any): ReturnType<any> {
  try {
    const request = yield call(getFriendsRequest);
    const name = friendId.toLocaleLowerCase();
    const fs = request.data.data;
    const friend = fs.find((f): boolean => f.username === name);

    yield put(getCurrentFriendAPISuccess({ ...request, data: friend }));
  } catch (error) {
    yield put(getCurrentFriendAPIFailure(error));
  }
}

export function* getCurrentFriend(): any {
  yield takeEvery(FriendActionType.GET_FRIEND_BY_ID_API, getCurrentFriendAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getFriends), fork(getCurrentFriend)]);
}
