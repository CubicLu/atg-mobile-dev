import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import { ActionType, FanFeedInterface } from '../../interfaces';
import { getFeedPostsAPISuccess, getFeedPostsAPIFailure } from '../../actions';

export const getFeedPostsRequest = async (): Promise<FanFeedInterface[]> =>
  await API.get('community/posts/post.json');

function* getFeedPostsAPI(): ReturnType<any> {
  try {
    const request = yield call(getFeedPostsRequest);
    yield put(getFeedPostsAPISuccess(request));
  } catch (error) {
    yield put(getFeedPostsAPIFailure(error));
  }
}

export function* getFeedPosts(): any {
  yield takeEvery(ActionType.GET_FEED_POSTS_API, getFeedPostsAPI);
}

export default function* rootSaga(): any {
  yield all([fork(getFeedPosts)]);
}
