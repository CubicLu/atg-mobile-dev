import { Action, SearchActionType, APIErrorInterface, APIResponseInterface } from '../../interfaces';

export const getSearchResultAPI = (query: string): Action<SearchActionType.GET_RESULT_API, { query: string }> => ({
  type: SearchActionType.GET_RESULT_API,
  payload: { query }
});

export const getSearchResultAPIFailure = (error: APIErrorInterface<string>): Action<SearchActionType.GET_RESULT_API_FAILURE, APIErrorInterface<string>> => ({
  type: SearchActionType.GET_RESULT_API_FAILURE,
  payload: error
});

export const getSearchResultAPISuccess = (response: APIResponseInterface<string>): Action<SearchActionType.GET_RESULT_API_SUCCESS, APIResponseInterface<string>> => ({
  type: SearchActionType.GET_RESULT_API_SUCCESS,
  payload: response
});