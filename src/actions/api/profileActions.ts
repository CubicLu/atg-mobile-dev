import { Action, ProfileActionType, ActionProperty } from './../../interfaces';

export const updateProfileProperty = (
  property: string,
  value: any
): Action<ProfileActionType.UPDATE_PROPERTY, ActionProperty<any>> => ({
  type: ProfileActionType.UPDATE_PROPERTY,
  payload: { property, value }
});
