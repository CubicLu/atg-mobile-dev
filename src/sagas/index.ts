import { all } from 'redux-saga/effects';
import artistSagas from './API/artist';
import communitySagas from './API/community';

export const rootSaga = function* root(): any {
  yield all([artistSagas(), communitySagas()]);
};
