import { 
  AuthActionType, 
  ActionProperty,
  Action
} from './../../interfaces';

export const updateAuthProperty = (
  property: string,
  value: any
): Action<AuthActionType.UPDATE_PROPERTY, ActionProperty<any>> => ({
  type: AuthActionType.UPDATE_PROPERTY,
  payload: { property, value }
});

export const updateAuthSignUpProperty = (
  property: string,
  value: any
): Action<AuthActionType.UPDATE_SIGN_UP_PROPERTY, ActionProperty<any>> => ({
  type: AuthActionType.UPDATE_SIGN_UP_PROPERTY,
  payload: { property, value }
});
