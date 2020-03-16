import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from './../../utils/api';
import { ActionType, ArtistInterface } from './../../interfaces';
import {
  getArtistsAPIFailure,
  getArtistsAPISuccess,
  getArtistAPISuccess,
  getArtistAPIFailure,
  getArtistEventAPISuccess,
  getArtistEventAPIFailure
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

export const getArtistEventRequest = async (
  username,
  eventId
): Promise<ArtistInterface> =>
  await API.get(`artist/${username}/event/${eventId}.json`);

function* getArtistEventAPI({ payload }: any): ReturnType<any> {
  try {
    const request = yield call(
      getArtistEventRequest,
      payload.username,
      payload.eventId
    );
    yield put(getArtistEventAPISuccess(request));
  } catch (error) {
    yield put(getArtistEventAPIFailure(error));
  }
}

export function* getArtistEvent(): any {
  yield takeEvery(ActionType.GET_ARTIST_EVENT_API, getArtistEventAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getArtists), fork(getArtist), fork(getArtistEvent)]);
}
