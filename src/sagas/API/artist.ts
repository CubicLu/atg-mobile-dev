import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from './../../utils/api';
import { ActionType, ArtistInterface } from './../../interfaces';
import {
  getArtistsAPIFailure,
  getArtistsAPISuccess,
  getArtistAPISuccess,
  getArtistAPIFailure
} from './../../actions';

export const getArtistsRequest = async (): Promise<ArtistInterface[]> =>
  await API.get('artist/all.json');

function* getArtistsAPI(): any {
  try {
    const request = yield call(getArtistsRequest);
    yield put(getArtistsAPISuccess(request));
  } catch (error) {
    yield put(getArtistsAPIFailure(error));
  }
}

export function* getArtists(): any {
  yield takeEvery(ActionType.GET_ARTISTS_API, getArtistsAPI);
}

export const getArtistRequest = async (username): Promise<ArtistInterface> =>
  await API.get(`artist/${username}.json`);

function* getArtistAPI({ payload }: any): ReturnType<any> {
  try {
    const request = yield call(getArtistRequest, payload);
    yield put(getArtistAPISuccess(request));
  } catch (error) {
    yield put(getArtistAPIFailure(error));
  }
}

export function* getArtist(): any {
  yield takeEvery(ActionType.GET_ARTIST_API, getArtistAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getArtists), fork(getArtist)]);
}
