import { Action, ActionType, SearchReducerType } from '../../interfaces';
import createReducer from './../createReducer';

const defaultState: SearchReducerType = {
  queryResult: ''
};

export const searchReducer = createReducer<SearchReducerType>(defaultState, {
  [ActionType.GET_SEARCH_RESULT_API](state: SearchReducerType): any {
    return {
      ...state,
      loading: true
    };
  },

  [ActionType.GET_SEARCH_RESULT_API_SUCCESS](
    state: SearchReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      queryResult: action.payload.data
    };
  },

  [ActionType.GET_SEARCH_RESULT_API_FAILURE](
    state: SearchReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload
    };
  }
});
