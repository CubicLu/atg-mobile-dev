import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import { SearchActionType, SearchInterface } from '../../models';
import {
  getSearchResultAPIFailure,
  getSearchResultAPISuccess
} from '../../actions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSearchResultRequest = async (query): Promise<SearchInterface> =>
  await API.get(`search/all.json?1234${new Date().getTime()}`);

function* getSearchResultAPI({ query }: any): ReturnType<any> {
  try {
    const request = yield call(getSearchResultRequest, query);
    yield put(getSearchResultAPISuccess(request));
  } catch (error) {
    yield put(getSearchResultAPIFailure(error));
  }
}

export function* getSearchResult(): any {
  yield takeLatest(SearchActionType.GET_RESULT_API, getSearchResultAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getSearchResult)]);
}
