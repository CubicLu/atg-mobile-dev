import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from './../../utils/api';
import { ActionType, ArtistInterface } from './../../interfaces';
import {
  getCommunityPostsAPIFailure,
  getCommunityPostsAPISuccess
} from './../../actions';

export const getCommunityPostsRequest = async (): Promise<ArtistInterface[]> =>
  await API.get('community/posts/post.json');

function* getCommunityPostsAPI(): any {
  try {
    const request = yield call(getCommunityPostsRequest);
    yield put(getCommunityPostsAPISuccess(request));
  } catch (error) {
    yield put(getCommunityPostsAPIFailure(error));
  }
}

export function* getCommunityPosts(): any {
  yield takeEvery(ActionType.GET_COMMUNITY_POSTS_API, getCommunityPostsAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getCommunityPosts)]);
}
