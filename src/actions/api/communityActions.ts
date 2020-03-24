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