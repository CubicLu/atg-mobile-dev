import { ActionType } from './../../interfaces';

export const updateProfileProperty = (
  property: string,
  value: any
): object => ({
  type: ActionType.UPDATE_PROFILE_PROPERTY,
  payload: { property, value }
});
