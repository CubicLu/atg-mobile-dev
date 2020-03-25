import { Action, ActionType, AuthReducerType } from './../../interfaces';
import createReducer from './../createReducer';

const defaultState: AuthReducerType = {
  loggedUser: undefined
};

export const authReducer = createReducer<AuthReducerType>(defaultState, {
  [ActionType.UPDATE_AUTH_PROPERTY](
    state: AuthReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      [action.payload.property]: action.payload.value
    };
  }
});
