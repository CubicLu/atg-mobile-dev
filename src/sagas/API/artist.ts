import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import {
  ArtistActionType,
  ArtistInterface,
  APIResponseInterface
} from '../../models';
import {
  getArtistsAPIFailure,
  getArtistsAPISuccess,
  getArtistAPISuccess,
  getArtistAPIFailure,
  getArtistEventAPISuccess,
  getArtistEventAPIFailure,
  getArtistGalleryCommentsAPIFailure,
  getArtistGalleryCommentsAPISuccess
} from '../../actions';

export const getArtistsRequest = async (): Promise<ArtistInterface[]> =>
  await API.get(`artist/all.json?${new Date().getTime()}`);

function* getArtistsAPI(): any {
  try {
    const request: APIResponseInterface<ArtistInterface[]> = yield call(
      getArtistsRequest
    );
    yield put(getArtistsAPISuccess(request));
  } catch (error) {
    yield put(getArtistsAPIFailure(error));
  }
}

export function* getArtists(): any {
  yield takeEvery(ArtistActionType.GET_ALL_API, getArtistsAPI);
}

export const getArtistRequest = async (username): Promise<ArtistInterface> =>
  await API.get(`artist/${username}.json?${new Date().getTime()}`);

function* getArtistAPI({ payload }: any): ReturnType<any> {
  try {
    const request = yield call(getArtistRequest, payload);
    yield put(getArtistAPISuccess(request));
  } catch (error) {
    yield put(getArtistAPIFailure(error));
  }
}

export function* getArtist(): any {
  yield takeEvery(ArtistActionType.GET_BY_USERNAME_API, getArtistAPI);
}

export const getArtistEventRequest = async (
  username,
  eventId
): Promise<ArtistInterface> =>
  await API.get(
    `artist/${username}/event/${eventId}.json?${new Date().getTime()}`
  );

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
  yield takeEvery(ArtistActionType.GET_EVENT_API, getArtistEventAPI);
}

export const getArtistGalleryCommentsRequest = async (
  photoId: number,
  username: string
): Promise<ArtistInterface[]> =>
  await API.get(
    `artist/${username}/commentaries/${photoId}.json?${new Date().getTime()}`
  );

function* getArtistGalleryCommentsAPI({ payload }: any): any {
  try {
    const request = yield call(
      getArtistGalleryCommentsRequest,
      payload.photoId,
      payload.username
    );
    yield put(getArtistGalleryCommentsAPISuccess(request));
  } catch (error) {
    yield put(getArtistGalleryCommentsAPIFailure(error));
  }
}

export function* getArtistGalleryComments(): any {
  yield takeEvery(
    ArtistActionType.GET_GALLERY_COMMENTS_API,
    getArtistGalleryCommentsAPI
  );
}

export default function* rootSaga(): any {
  yield all([
    fork(getArtists),
    fork(getArtist),
    fork(getArtistEvent),
    fork(getArtistGalleryComments)
  ]);
}
