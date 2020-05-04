import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import {
  ActionType,
  DashboardInterface,
  APIResponseInterface
} from '../../interfaces';
import {
  getDashboardByArtistAPIFailure,
  getDashboardByArtistAPISuccess
} from '../../actions';

export const getDashboardByArtistRequest = async (
  username
): Promise<DashboardInterface> => await API.get(`dashboard/${username}.json`);

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
  yield takeEvery(
    ActionType.GET_DASHBOARD_BY_ARTIST_API,
    getDashboardByArtistAPI
  );
}

export default function* rootSaga(): any {
  yield all([fork(getDashboardByArtist)]);
}
