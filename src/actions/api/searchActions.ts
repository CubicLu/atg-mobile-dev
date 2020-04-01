import { ActionType } from '../../interfaces';

export const getSearchResultAPI = (query: string): any => (
  console.log(query),
  {
    type: ActionType.GET_SEARCH_RESULT_API,
    payload: { query }
  }
);

export const getSearchResultAPIFailure = (error): any => ({
  type: ActionType.GET_SEARCH_RESULT_API_FAILURE,
  payload: error
});

export const getSearchResultAPISuccess = (response): any => ({
  type: ActionType.GET_SEARCH_RESULT_API_SUCCESS,
  payload: response
});
