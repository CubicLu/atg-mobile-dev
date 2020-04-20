import { ActionType } from '../interfaces';

export const updateNavbarProperty = (property: string, value: any): any => ({
  type: ActionType.UPDATE_NAVBAR_PROPERTY,
  payload: { property, value }
});
export const toggleNavBarTwoActions = (status: boolean): any => ({
  type: ActionType.TOGGLE_NAVBAR_TWOACTIONS,
  payload: { status }
});
export const updateNavBarTwoActions = (
  leftLabel: string,
  rightLabel: string,
  leftAction: Function,
  rightAction: Function
): any => ({
  type: ActionType.UPDATE_NAVBAR_TWOACTIONS,
  payload: { leftLabel, rightLabel, leftAction, rightAction }
});
