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
