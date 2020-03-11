import { all } from 'redux-saga/effects';
import artistSagas from './API/artist';

export const rootSaga = function* root(): any {
  yield all([artistSagas()]);
};
