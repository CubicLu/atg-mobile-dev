import { Action, ActionType, AuthReducerType } from './../../interfaces';
import createReducer from './../createReducer';

const defaultState: AuthReducerType = {
  loggedUser: undefined,
  signUpUser: {
    nickname: '',
    email: ''
  }
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
  },
  [ActionType.UPDATE_AUTH_SIGN_UP_PROPERTY](
    state: AuthReducerType,
    action: Action<any>
  ): any {
    return {
      ...state,
      signUpUser: {
        ...state.signUpUser,
        [action.payload.property]: action.payload.value
      }
    };
  }
});
