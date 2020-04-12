import { all } from 'redux-saga/effects';
import artistSagas from './API/artist';
import communitySagas from './API/community';
import searchSagas from './API/search';
import radioSagas from './API/radio';

export const rootSaga = function* root(): any {
  yield all([artistSagas(), communitySagas(), searchSagas(), radioSagas()]);
};
