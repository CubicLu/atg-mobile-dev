import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import {
  DashboardActionType,
  DashboardInterface,
  APIResponseInterface
} from '../../models';
import {
  getDashboardByArtistAPIFailure,
  getDashboardByArtistAPISuccess
} from '../../actions';

export const getDashboardByArtistRequest = async (
  username
): Promise<DashboardInterface> =>
  await API.get(`dashboard/${username}.json?${new Date().getTime()}`);

function* getDashboardByArtistAPI({ payload }: any): ReturnType<any> {
  try {
    const request: APIResponseInterface<DashboardInterface> = yield call(
      getDashboardByArtistRequest,
      payload
    );
    yield put(getDashboardByArtistAPISuccess(request));
  } catch (error) {
    yield put(getDashboardByArtistAPIFailure(error));
  }
}

export function* getDashboardByArtist(): any {
  yield takeLatest(
    DashboardActionType.GET_BY_DASH_ARTIST_API,
    getDashboardByArtistAPI
  );
}

export default function* rootSaga(): any {
  yield all([fork(getDashboardByArtist)]);
}
