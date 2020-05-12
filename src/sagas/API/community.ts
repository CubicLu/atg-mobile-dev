import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { API } from '../../utils/api';
import {
  CommunityActionType,
  CommunityArtistInterface,
  ArtistInterface,
  PostInterface,
  StorieInterface
} from '../../interfaces';
import {
  getCommunityPostsAPIFailure,
  getCommunityPostsAPISuccess,
  getCommunityCommentsAPIFailure,
  getCommunityCommentsAPISuccess,
  getCommunityCommentsCoverAPIFailure,
  getCommunityCommentsCoverAPISuccess,
  getCommunityByArtistUsernameAPIFailure,
  getCommunityByArtistUsernameAPISuccess,
  getCommunityStoriesAPISuccess,
  getCommunityStoriesAPIFailure
} from '../../actions';

export const getCommunityPostsRequest = async (): Promise<PostInterface[]> =>
  await API.get(`community/posts/post.json?${new Date().getTime()}`);

function* getCommunityPostsAPI(): ReturnType<any> {
  try {
    const request = yield call(getCommunityPostsRequest);
    yield put(getCommunityPostsAPISuccess(request));
  } catch (error) {
    yield put(getCommunityPostsAPIFailure(error));
  }
}

export function* getCommunityPosts(): any {
  yield takeEvery(CommunityActionType.GET_POSTS_API, getCommunityPostsAPI);
}

export const getCommunityByArtistUsernameRequest = async (
  username: string
): Promise<CommunityArtistInterface> =>
  await API.get(`community/posts/${username}.json?${new Date().getTime()}`);

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
    CommunityActionType.GET_BY_ARTIST_USERNAME_API,
    getCommunityByArtistUsernameAPI
  );
}

export const getCommunityStoriesRequest = async (): Promise<StorieInterface[]> =>
  await API.get(`community/stories/stories.json?${new Date().getTime()}`);

function* getCommunityStoriesAPI(): ReturnType<any> {
  try {
    const request = yield call(getCommunityStoriesRequest);
    yield put(getCommunityStoriesAPISuccess(request));
  } catch (error) {
    yield put(getCommunityStoriesAPIFailure(error));
  }
}

export function* getCommunityStories(): any {
  yield takeEvery(CommunityActionType.GET_STORIES_API, getCommunityStoriesAPI);
}

export const getCommunityCommentsRequest = async (
  postId: string
): Promise<ArtistInterface[]> =>
  await API.get(
    `community/posts/comments/${postId}.json?${new Date().getTime()}`
  );

function* getCommunityCommentsAPI({ payload }: any): any {
  try {
    const request = yield call(getCommunityCommentsRequest, payload);
    yield put(getCommunityCommentsAPISuccess(request));
  } catch (error) {
    yield put(getCommunityCommentsAPIFailure(error));
  }
}

export function* getCommunityComments(): any {
  yield takeEvery(
    CommunityActionType.GET_COMMENTARIES_API,
    getCommunityCommentsAPI
  );
}

export const getCommunityCoverRequest = async (
  postId: string
): Promise<ArtistInterface[]> =>
  await API.get(`community/posts/cover/${postId}.json?${new Date().getTime()}`);

function* getCommunityCommentsCoverAPI({ payload }: any): any {
  try {
    const request = yield call(getCommunityCoverRequest, payload);
    yield put(getCommunityCommentsCoverAPISuccess(request));
  } catch (error) {
    yield put(getCommunityCommentsCoverAPIFailure(error));
  }
}

export function* getCommunityCover(): any {
  yield takeEvery(
    CommunityActionType.GET_COMMENTARIES_COVER_API,
    getCommunityCommentsCoverAPI
  );
}

export default function* rootSaga(): any {
  yield all([
    fork(getCommunityPosts),
    fork(getCommunityByArtistUsername),
    fork(getCommunityStories),
    fork(getCommunityComments),
    fork(getCommunityCover)
  ]);
}
