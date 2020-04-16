import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import { ActionType, ChannelInterface } from '../../interfaces';
import {
  getRadioArtistAPIFailure,
  getRadioArtistAPISuccess
} from '../../actions';

export const getRadioArtistRequest = async (
  radioId: string
): Promise<ChannelInterface> => await API.get(`radio/${radioId}.json`);

function* getRadioArtistAPI({ payload }: any): ReturnType<any> {
  try {
    const request = yield call(getRadioArtistRequest, payload);
    yield put(getRadioArtistAPISuccess(request));
  } catch (error) {
    yield put(getRadioArtistAPIFailure(error));
  }
}

export function* getRadioArtist(): any {
  yield takeEvery(ActionType.GET_RADIO_ARTIST, getRadioArtistAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getRadioArtist)]);
}
