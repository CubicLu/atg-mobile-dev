import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import { FriendActionType, FriendInterface } from '../../models';
import {
  getFriendsAPIFailure,
  getFriendsAPISuccess,
  getCurrentFriendAPISuccess,
  getCurrentFriendAPIFailure
} from '../../actions/api/friendsActions';

const friends = {
  Rosetta: {
    name: 'Rosetta',
    nickname: 'Musical Goddess',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/amanda.jpg',
    friend: true,
    city: 'London, UK',
    followers: 100
  },
  Amanda: {
    name: 'Amanda',
    nickname: 'Queen of Pop',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/amanda.jpg',
    friend: true,
    city: 'London, UK',
    followers: 100
  },
  Brian: {
    name: 'Brian',
    nickname: 'Prince of Darkness',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/brian.jpg',
    friend: false,
    city: 'New York, USA',
    followers: 1000
  },
  Chris: {
    name: 'Chris',
    nickname: 'The Boss',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/dexter.jpg',
    friend: true,
    city: 'Kyiv, Ukraine',
    followers: 10000
  },
  Damiana: {
    name: 'Damiana',
    nickname: 'The Fab Lady',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/chris.jpg',
    friend: true,
    city: 'London, UK',
    followers: 100000
  },
  Eleonore: {
    name: 'Eleonore',
    nickname: 'Slowhand',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/eleonore.jpg',
    friend: false,
    city: 'New York, USA',
    followers: 1000000
  },
  Fabrizio: {
    name: 'Fabrizio',
    nickname: 'Man in Black',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/fabrizio.jpg',
    friend: false,
    city: 'Kyiv, Ukraine',
    followers: 9999
  },
  Gabriela: {
    name: 'Gabriela',
    nickname: 'Old Blues Eyes',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/gabriela.jpg',
    friend: false,
    city: 'New York, USA',
    followers: 9991
  },
  Harold: {
    name: 'Harold',
    nickname: 'Piano Man',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/harold.jpg',
    friend: true,
    city: 'London, UK',
    followers: 999999
  }
};

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

export const getCurrentRequest = async (): Promise<FriendInterface[]> =>
  await API.get('profile/friends.json');

function* getCurrentFriendAPI({ payload: { friendId } }: any): ReturnType<any> {
  try {
    const request = yield call(getFriendsRequest);
    yield put(
      getCurrentFriendAPISuccess({ ...request, data: friends[friendId] })
    );
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
