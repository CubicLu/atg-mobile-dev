import { Action, ProfileActionType, ActionProperty } from './../../models';

export const updateProfileProperty = (
  property: string,
  value: any
): Action<ProfileActionType.UPDATE_PROPERTY, ActionProperty<any>> => ({
  type: ProfileActionType.UPDATE_PROPERTY,
  payload: { property, value }
});
