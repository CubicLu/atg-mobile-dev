import { Action, ActionType, AuthReducerType } from './../../interfaces';
import createReducer from './../createReducer';

const defaultState: AuthReducerType = {
  logged_user: {
    name: 'Débora',
    email: 'debora.goncalves@vigil365.com'
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
  }
});
