import { ActionType } from './../../interfaces';

export const updateAuthProperty = (property: string, value: any): any => ({
  type: ActionType.UPDATE_AUTH_PROPERTY,
  payload: { property, value }
});
