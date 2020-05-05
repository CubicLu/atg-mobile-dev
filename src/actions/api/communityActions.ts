import { 
  CommunityActionType, 
  ActionProperty, 
  Action, 
  APIErrorInterface,
  APIResponseInterface,
  PostInterface
} from './../../interfaces';

export const updateCommunityProperty = (
  property: string,
  value: any
): Action<CommunityActionType.UPDATE_PROPERTY, ActionProperty<any>> => ({
  type: CommunityActionType.UPDATE_PROPERTY,
  payload: { property, value }
});

export const updateCommunitySetInitialProperty = (
  property: string
): Action<CommunityActionType.UPDATE_SET_INITIAL_PROPERTY, string> => ({
  type: CommunityActionType.UPDATE_SET_INITIAL_PROPERTY,
  payload: property
});

export const getCommunityPostsAPI = (): Action<CommunityActionType.GET_POSTS_API> => ({
  type: CommunityActionType.GET_POSTS_API
});

export const getCommunityPostsAPIFailure = (
  error: APIErrorInterface<string>
): Action<CommunityActionType.GET_POSTS_API_FAILURE, APIErrorInterface<string>> => ({
  type: CommunityActionType.GET_POSTS_API_FAILURE,
  payload: error
});

export const getCommunityPostsAPISuccess = (
  response: APIResponseInterface<PostInterface[]>
): Action<CommunityActionType.GET_POSTS_API_SUCCESS, APIResponseInterface<PostInterface[]>> => ({
  type: CommunityActionType.GET_POSTS_API_SUCCESS,
  payload: response
});

export const getCommunityByArtistUsernameAPI = (
  username: string
): Action<CommunityActionType.GET_BY_ARTIST_USERNAME_API, string> => ({
  type: CommunityActionType.GET_BY_ARTIST_USERNAME_API,
  payload: username
});

export const getCommunityByArtistUsernameAPIFailure = (
  error: APIErrorInterface<string>
): Action<CommunityActionType.GET_BY_ARTIST_USERNAME_API_FAILURE, APIErrorInterface<string>> => ({
  type: CommunityActionType.GET_BY_ARTIST_USERNAME_API_FAILURE,
  payload: error
});

export const getCommunityByArtistUsernameAPISuccess = (response: APIResponseInterface<string>): Action<CommunityActionType.GET_BY_ARTIST_USERNAME_API_SUCCESS, APIResponseInterface<any>> => ({
  type: CommunityActionType.GET_BY_ARTIST_USERNAME_API_SUCCESS,
  payload: response
});

export const getCommunityStoriesAPI = (): Action<CommunityActionType.GET_STORIES_API, APIResponseInterface<any>> => ({
  type: CommunityActionType.GET_STORIES_API
});

export const getCommunityStoriesAPIFailure = (error: APIErrorInterface<string>): Action<CommunityActionType.GET_STORIES_API_FAILURE, APIErrorInterface<string>> => ({
  type: CommunityActionType.GET_STORIES_API_FAILURE,
  payload: error
});

export const getCommunityStoriesAPISuccess = (response: APIResponseInterface<string>): Action<CommunityActionType.GET_STORIES_API_SUCCESS, APIResponseInterface<any>> => ({
  type: CommunityActionType.GET_STORIES_API_SUCCESS,
  payload: response
});

export const getCommunityCommentsAPI = (postId: string): Action<CommunityActionType.GET_COMMENTARIES_API, string> => ({
  type: CommunityActionType.GET_COMMENTARIES_API,
  payload: postId
});

export const getCommunityCommentsAPIFailure = (error: APIErrorInterface<string>): Action<CommunityActionType.GET_COMMENTARIES_API_FAILURE, APIErrorInterface<string>> => ({
  type: CommunityActionType.GET_COMMENTARIES_API_FAILURE,
  payload: error
});

export const getCommunityCommentsAPISuccess = (response: APIResponseInterface<string>): Action<CommunityActionType.GET_COMMENTARIES_API_SUCCESS, APIResponseInterface<any>> => ({
  type: CommunityActionType.GET_COMMENTARIES_API_SUCCESS,
  payload: response
});

export const getCommunityCommentsCoverAPI = (postId: string): Action<CommunityActionType.GET_COMMENTARIES_COVER_API, string> => ({
  type: CommunityActionType.GET_COMMENTARIES_COVER_API,
  payload: postId
});

export const getCommunityCommentsCoverAPIFailure = (error: APIErrorInterface<string>): Action<CommunityActionType.GET_COMMENTARIES_COVER_API_FAILURE, APIErrorInterface<string>> => ({
  type: CommunityActionType.GET_COMMENTARIES_COVER_API_FAILURE,
  payload: error
});

export const getCommunityCommentsCoverAPISuccess = (response: APIResponseInterface<string>): Action<CommunityActionType.GET_COMMENTARIES_COVER_API_SUCCESS, APIResponseInterface<any>> => ({
  type: CommunityActionType.GET_COMMENTARIES_COVER_API_SUCCESS,
  payload: response
});