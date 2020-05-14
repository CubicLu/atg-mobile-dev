import { all } from 'redux-saga/effects';
import artistSagas from './API/artist';
import communitySagas from './API/community';
import searchSagas from './API/search';
import friendsSagas from './API/friends';
import radioSagas from './API/radio';
import dashboardSagas from './API/dashboard';
import subscriberSagas from './API/subscriber';

export const rootSaga = function* root(): any {
  yield all([
    artistSagas(),
    communitySagas(),
    searchSagas(),
    friendsSagas(),
    radioSagas(),
    dashboardSagas(),
    subscriberSagas()
  ]);
};
