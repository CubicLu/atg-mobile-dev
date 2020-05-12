import { NavbarActionType, Action, ActionProperty } from '../models';

export const updateNavbarProperty = (
  property: string,
  value: any
): Action<NavbarActionType.UPDATE_PROPERTY, ActionProperty<any>> => ({
  type: NavbarActionType.UPDATE_PROPERTY,
  payload: { property, value }
});
export const toggleNavBarTwoActions = (
  status: boolean
): Action<NavbarActionType.TOGGLE_TWOACTIONS, { status: boolean }> => ({
  type: NavbarActionType.TOGGLE_TWOACTIONS,
  payload: { status }
});
export const updateNavBarTwoActions = (
  leftLabel: string,
  rightLabel: string,
  leftAction: Function,
  rightAction: Function
): Action<
  NavbarActionType.UPDATE_TWOACTIONS,
  {
    leftLabel: string;
    rightLabel: string;
    leftAction: Function;
    rightAction: Function;
  }
> => ({
  type: NavbarActionType.UPDATE_TWOACTIONS,
  payload: { leftLabel, rightLabel, leftAction, rightAction }
});
