import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API, APIBeta } from '../../utils/api';
import { ChannelInterface, SubscriberActionType } from '../../models';
import {
  getSubscriberArtistsAPISuccess,
  getSubscriberArtistsAPIFailure
} from '../../actions';

export const getSubscriberArtistsRequest = async (
  id: string
): Promise<ChannelInterface> =>
  await APIBeta.get(`subscribers/${id.toString()}/artists`);

function* getSubscriberArtistsAPI({ payload }: any): ReturnType<any> {
  try {
    const request = yield call(getSubscriberArtistsRequest, payload);
    yield put(getSubscriberArtistsAPISuccess(request));
  } catch (error) {
    yield put(getSubscriberArtistsAPIFailure(error));
  }
}

export function* getSubscriberArtists(): any {
  yield takeEvery(
    SubscriberActionType.GET_ARTISTS_API,
    getSubscriberArtistsAPI
  );
}

export default function* rootSaga(): any {
  yield all([fork(getSubscriberArtists)]);
}
