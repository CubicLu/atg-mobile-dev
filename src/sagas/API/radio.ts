import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import { RadioActionType, ChannelInterface } from '../../models';
import {
  getRadioArtistAPIFailure,
  getRadioArtistAPISuccess
} from '../../actions';

export const getRadioArtistRequest = async (
  radioId: string
): Promise<ChannelInterface> =>
  await API.get(`radio/${radioId}.json?${new Date().getTime()}`);

function* getRadioArtistAPI({ payload }: any): ReturnType<any> {
  try {
    const request = yield call(getRadioArtistRequest, payload);
    yield put(getRadioArtistAPISuccess(request));
  } catch (error) {
    yield put(getRadioArtistAPIFailure(error));
  }
}

export function* getRadioArtist(): any {
  yield takeLatest(RadioActionType.GET_BY_RADIO_ARTIST_API, getRadioArtistAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getRadioArtist)]);
}
