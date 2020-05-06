import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import { FriendActionType, FriendInterface } from '../../interfaces';
import {
  getFriendsAPIFailure,
  getFriendsAPISuccess,
  getCurrentFriendAPISuccess,
  getCurrentFriendAPIFailure
} from '../../actions/api/friendsActions';

const friends = {
  Amanda: {
    name: 'Amanda',
    friend: true,
    city: 'London, UK',
    followers: 100
  },
  Brian: {
    name: 'Brian',
    friend: false,
    city: 'New York, USA',
    followers: 1000
  }
};

export const getFriendsRequest = async (): Promise<FriendInterface[]> =>
  await API.get('profile/friends.json');

function* getFriendsAPI(): any {
  try {
    const request = yield call(getFriendsRequest);
    yield put(getFriendsAPISuccess(request));
  } catch (error) {
    yield put(getFriendsAPIFailure(error));
  }
}
export function* getFriends(): any {
  yield takeEvery(FriendActionType.GET_ALL_API, getFriendsAPI);
}

export const getCurrentRequest = async (): Promise<FriendInterface[]> =>
  await API.get('profile/friends.json');

function* getCurrentFriendAPI({ payload: { friendId } }: any): ReturnType<any> {
  try {
    const request = yield call(getFriendsRequest);
    yield put(getCurrentFriendAPISuccess({ ...request, data: friends[friendId] }));
  } catch (error) {
    yield put(getCurrentFriendAPIFailure(error));
  }
}

export function* getArtist(): any {
  yield takeEvery(FriendActionType.GET_BY_ID_API, getCurrentFriendAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getFriends), fork(getArtist)]);
}
