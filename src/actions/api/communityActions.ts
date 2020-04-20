import { ActionType } from './../../interfaces';

export const updateCommunityProperty = (property: string, value: any): any => ({
  type: ActionType.UPDATE_COMMUNITY_PROPERTY,
  payload: { property, value }
});

export const updateCommunitySetInitialProperty = (property: string): any => ({
  type: ActionType.UPDATE_COMMUNITY_SET_INITIAL_PROPERTY,
  payload: property
});

export const getCommunityPostsAPI = (): any => ({
  type: ActionType.GET_COMMUNITY_POSTS_API
});

export const getCommunityPostsAPIFailure = (error): any => ({
  type: ActionType.GET_COMMUNITY_POSTS_API_FAILURE,
  payload: error
});

export const getCommunityPostsAPISuccess = (response): any => ({
  type: ActionType.GET_COMMUNITY_POSTS_API_SUCCESS,
  payload: response
});

export const getCommunityByArtistUsernameAPI = (username: string): any => ({
  type: ActionType.GET_COMMUNITY_BY_ARTIST_USERNAME_API,
  payload: username
});

export const getCommunityByArtistUsernameAPIFailure = (error): any => ({
  type: ActionType.GET_COMMUNITY_BY_ARTIST_USERNAME_API_FAILURE,
  payload: error
});

export const getCommunityByArtistUsernameAPISuccess = (response): any => ({
  type: ActionType.GET_COMMUNITY_BY_ARTIST_USERNAME_API_SUCCESS,
  payload: response
});

export const getCommunityStoriesAPI = (): any => ({
  type: ActionType.GET_COMMUNITY_STORIES_API
});

export const getCommunityStoriesAPIFailure = (error): any => ({
  type: ActionType.GET_COMMUNITY_STORIES_API_FAILURE,
  payload: error
});

export const getCommunityStoriesAPISuccess = (response): any => ({
  type: ActionType.GET_COMMUNITY_STORIES_API_SUCCESS,
  payload: response
});

export const getCommunityCommentsAPI = (postId: string): any => ({
  type: ActionType.GET_COMMUNITY_COMMENTARIES_API,
  payload: postId
});

export const getCommunityCommentsAPIFailure = (error): any => ({
  type: ActionType.GET_COMMUNITY_COMMENTARIES_API_FAILURE,
  payload: error
});

export const getCommunityCommentsAPISuccess = (response): any => ({
  type: ActionType.GET_COMMUNITY_COMMENTARIES_API_SUCCESS,
  payload: response
});

export const getCommunityCommentsCoverAPI = (postId: string): any => ({
  type: ActionType.GET_COMMUNITY_COMMENTARIES_COVER_API,
  payload: postId
});

export const getCommunityCommentsCoverAPIFailure = (error): any => ({
  type: ActionType.GET_COMMUNITY_COMMENTARIES_COVER_API_FAILURE,
  payload: error
});

export const getCommunityCommentsCoverAPISuccess = (response): any => ({
  type: ActionType.GET_COMMUNITY_COMMENTARIES_COVER_API_SUCCESS,
  payload: response
});

export const getFeedPostsAPI = (): any => ({
  type: ActionType.GET_FEED_POSTS_API
});

export const getFeedPostsAPIFailure = (error): any => ({
  type: ActionType.GET_FEED_POSTS_API_FAILURE,
  payload: error
});

export const getFeedPostsAPISuccess = (response): any => ({
  type: ActionType.GET_FEED_POSTS_API_SUCCESS,
  payload: response
});
