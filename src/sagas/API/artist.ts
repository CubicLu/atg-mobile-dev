import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  fork
} from 'redux-saga/effects';
import { API, API_MOCK } from 'utils/api';
import {
  ArtistActionType,
  ArtistInterface,
  VideosBetaInterface,
  APIResponseInterface,
  PostSubscriptionInterface,
  SubscriptionInterface
} from 'models';
import {
  getArtistsAPIFailure,
  getArtistsAPISuccess,
  getArtistAPISuccess,
  getArtistAPIFailure,
  getArtistEventAPISuccess,
  getArtistEventAPIFailure,
  getArtistGalleryCommentsAPIFailure,
  getArtistGalleryCommentsAPISuccess,
  getSupportLevelsAPISuccess,
  getSupportLevelsAPIFailure,
  getArtistVideosAPISuccess,
  getArtistVideosAPIFailure,
  postSubscribeArtistAPISuccess,
  postSubscribeArtistAPIFailure
} from 'actions';

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
  yield takeLatest(ArtistActionType.GET_ALL_API, getArtistsAPI);
}

export const getArtistRequest = async (id): Promise<ArtistInterface> =>
  await API_MOCK.get(`artists/${id}`);

function* getArtistAPI({ payload }: any): ReturnType<any> {
  try {
    const request = yield call(getArtistRequest, payload);
    yield put(getArtistAPISuccess(request));
  } catch (error) {
    yield put(getArtistAPIFailure(error));
  }
}

export function* getArtist(): any {
  yield takeEvery(ArtistActionType.GET_BY_ID_API, getArtistAPI);
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
  yield takeLatest(ArtistActionType.GET_EVENT_API, getArtistEventAPI);
}

export const getArtistVideosRequest = async (
  artistID
): Promise<VideosBetaInterface> =>
  await API_MOCK.get(`video-sections?artist=${artistID}`);

function* getArtistVideosAPI({ payload }: any): ReturnType<any> {
  try {
    const request = yield call(getArtistVideosRequest, payload.artistID);
    yield put(getArtistVideosAPISuccess(request));
  } catch (error) {
    yield put(getArtistVideosAPIFailure(error));
  }
}

export function* getArtistVideos(): any {
  yield takeEvery(ArtistActionType.GET_VIDEO_API, getArtistVideosAPI);
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
  yield takeLatest(
    ArtistActionType.GET_GALLERY_COMMENTS_API,
    getArtistGalleryCommentsAPI
  );
}

export const getSupportLevelsRequest = async (): Promise<ArtistInterface[]> =>
  await API_MOCK.get('support-levels');

function* getSupportLevelsAPI(): any {
  try {
    const request = yield call(getSupportLevelsRequest);
    yield put(getSupportLevelsAPISuccess(request));
  } catch (error) {
    yield put(getSupportLevelsAPIFailure(error));
  }
}

export function* getSupportLevels(): any {
  yield takeEvery(ArtistActionType.GET_SUPPORT_LEVELS_API, getSupportLevelsAPI);
}

export const postSubscribeArtistRequest = async (
  data: PostSubscriptionInterface
): Promise<SubscriptionInterface> => await API_MOCK.post('subscriptions', data);

function* postSubscribeArtistAPI({ payload }: any): any {
  try {
    const request = yield call(postSubscribeArtistRequest, payload);
    yield put(postSubscribeArtistAPISuccess(request));
  } catch (error) {
    yield put(postSubscribeArtistAPIFailure(error));
  }
}

export function* postSubscribeArtist(): any {
  yield takeEvery(ArtistActionType.POST_SUBSCRIBE_API, postSubscribeArtistAPI);
}

export default function* rootSaga(): any {
  yield all([
    fork(getArtists),
    fork(getArtist),
    fork(getArtistEvent),
    fork(getArtistGalleryComments),
    fork(getSupportLevels),
    fork(getArtistVideos),
    fork(postSubscribeArtist)
  ]);
}
