import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import { ActionType, ChannelInterface } from '../../interfaces';
import {
  getRadioArtistAPIFailure,
  getRadioArtistAPISuccess
} from '../../actions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRadioArtistRequest = async (id: string
): Promise<ChannelInterface> => await API.get(`artist/pharell-williams.json`);

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
