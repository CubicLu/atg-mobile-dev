import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import { ActionType, FriendInterface } from '../../interfaces';
import {
  getFriendsAPIFailure,
  getFriendsAPISuccess,
  getCurrentFriendAPISuccess,
  getCurrentFriendAPIFailure
} from '../../actions/api/friendsActions';
import { AxiosError } from 'axios';

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
    yield put(getFriendsAPISuccess(request.data.data));
  } catch (error) {
    const axiosError = error as AxiosError<string>;
    yield put(getFriendsAPIFailure(axiosError.message));
  }
}
export function* getFriends(): any {
  yield takeEvery(ActionType.GET_FRIENDS_API, getFriendsAPI);
}

function* getCurrentFriendAPI({ payload: { friendId } }: any): ReturnType<any> {
  try {
    yield put(getCurrentFriendAPISuccess({ data: friends[friendId] }));
  } catch (error) {
    const axiosError = error as AxiosError<string>;
    yield put(getCurrentFriendAPIFailure(axiosError.message));
  }
}

export function* getArtist(): any {
  yield takeEvery(ActionType.GET_FRIEND_API, getCurrentFriendAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getFriends), fork(getArtist)]);
}
