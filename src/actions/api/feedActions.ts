import {
  FeedActionType,
  Action,
  APIErrorInterface,
  APIResponseInterface
} from '../../models';

export const getFeedPostsAPI = (): Action<FeedActionType.GET_ALL_POSTS_API> => ({
  type: FeedActionType.GET_ALL_POSTS_API
});

export const getFeedPostsAPIFailure = (
  error: APIErrorInterface<string>
): Action<
  FeedActionType.GET_ALL_POSTS_API_FAILURE,
  APIErrorInterface<string>
> => ({
  type: FeedActionType.GET_ALL_POSTS_API_FAILURE,
  payload: error
});

export const getFeedPostsAPISuccess = (
  response: APIResponseInterface<string>
): Action<
  FeedActionType.GET_ALL_POSTS_API_SUCCESS,
  APIResponseInterface<string>
> => ({
  type: FeedActionType.GET_ALL_POSTS_API_SUCCESS,
  payload: response
});
