import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from './../../utils/api';
import {
  ActionType,
  CommunityArtistInterface,
  PostInterface,
  StorieInterface
} from './../../interfaces';
import {
  getCommunityPostsAPIFailure,
  getCommunityPostsAPISuccess,
  getCommunityByArtistUsernameAPIFailure,
  getCommunityByArtistUsernameAPISuccess,
  getCommunityStoriesAPISuccess,
  getCommunityStoriesAPIFailure
} from './../../actions';

export const getCommunityPostsRequest = async (): Promise<PostInterface[]> =>
  await API.get('community/posts/post.json');

function* getCommunityPostsAPI(): ReturnType<any> {
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

export const getCommunityByArtistUsernameRequest = async (
  username
): Promise<CommunityArtistInterface> =>
  await API.get(`community/posts/${username}.json`);

function* getCommunityByArtistUsernameAPI({ payload }): ReturnType<any> {
  try {
    const request = yield call(getCommunityByArtistUsernameRequest, payload);
    yield put(getCommunityByArtistUsernameAPISuccess(request));
  } catch (error) {
    yield put(getCommunityByArtistUsernameAPIFailure(error));
  }
}

export function* getCommunityByArtistUsername(): any {
  yield takeEvery<any>(
    ActionType.GET_COMMUNITY_BY_ARTIST_USERNAME_API,
    getCommunityByArtistUsernameAPI
  );
}

export const getCommunityStoriesRequest = async (): Promise<StorieInterface[]> =>
  await API.get('community/stories/stories.json');

function* getCommunityStoriesAPI(): ReturnType<any> {
  try {
    const request = yield call(getCommunityStoriesRequest);
    yield put(getCommunityStoriesAPISuccess(request));
  } catch (error) {
    yield put(getCommunityStoriesAPIFailure(error));
  }
}

export function* getCommunityStories(): any {
  yield takeEvery(ActionType.GET_COMMUNITY_STORIES_API, getCommunityStoriesAPI);
}

export default function* rootSaga(): any {
  yield all([
    fork(getCommunityPosts),
    fork(getCommunityByArtistUsername),
    fork(getCommunityStories)
  ]);
}
