import { Action, ActionType, AuthReducerType } from './../../interfaces';
import createReducer from './../createReducer';

const defaultState: AuthReducerType = {
  loggedUser: {
    name: 'Débora',
    email: 'debora.goncalves@vigil365.com',
    username: 'debora_cgs',
    avatar:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/default-avatar.jpg'
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
