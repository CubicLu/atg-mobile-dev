import { Action, AuthActionType, AuthReducerType, ActionProperty } from './../../interfaces';
import createReducer from './../createReducer';

const defaultState: AuthReducerType = {
  loggedUser: undefined,
  signUpUser: {
    nickname: '',
    email: ''
  }
};

export const authReducer = createReducer<AuthReducerType>(defaultState, {
  [AuthActionType.UPDATE_PROPERTY](
    state: AuthReducerType,
    action: Action<AuthActionType.UPDATE_PROPERTY, ActionProperty<any>>
  ): AuthReducerType {
    return {
      ...state,
      [action.payload!.property]: action.payload!.value
    };
  },
  [AuthActionType.UPDATE_SIGN_UP_PROPERTY](
    state: AuthReducerType,
    action: Action<AuthActionType.UPDATE_SIGN_UP_PROPERTY, ActionProperty<any>>
  ): AuthReducerType {
    return {
      ...state,
      signUpUser: {
        ...state.signUpUser,
        [action.payload!.property]: action.payload!.value
      }
    };
  }
});
