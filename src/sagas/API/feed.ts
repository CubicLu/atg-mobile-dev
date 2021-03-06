import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import { FeedActionType, FanFeedInterface } from '../../models';
import { getFeedPostsAPISuccess, getFeedPostsAPIFailure } from '../../actions';

export const getFeedPostsRequest = async (): Promise<FanFeedInterface[]> =>
  await API.get(`community/posts/post.json?${new Date().getTime()}`);

function* getFeedPostsAPI(): ReturnType<any> {
  try {
    const request = yield call(getFeedPostsRequest);
    yield put(getFeedPostsAPISuccess(request));
  } catch (error) {
    yield put(getFeedPostsAPIFailure(error));
  }
}

export function* getFeedPosts(): any {
  yield takeLatest(FeedActionType.GET_ALL_POSTS_API, getFeedPostsAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getFeedPosts)]);
}
