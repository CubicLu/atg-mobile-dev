import { Action, SearchActionType, SearchReducerType } from '../../models';
import createReducer from './../createReducer';

const defaultState: SearchReducerType = {
  queryResult: ''
};

export const searchReducer = createReducer<SearchReducerType>(defaultState, {
  [SearchActionType.GET_RESULT_API](state: SearchReducerType): any {
    return {
      ...state,
      loading: true
    };
  },

  [SearchActionType.GET_RESULT_API_SUCCESS](
    state: SearchReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      loading: false,
      queryResult: action.payload.data
    };
  },

  [SearchActionType.GET_RESULT_API_FAILURE](
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
