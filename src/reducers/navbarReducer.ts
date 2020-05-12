import { Action, NavbarActionType, NavbarReducerType } from '../models';
import createReducer from './createReducer';

const defaultState: NavbarReducerType = {
  navbarTwoButtons: {
    status: false,
    leftLabel: 'Cancel',
    rightLabel: 'Done',
    leftAction: (): void => {},
    rightAction: (): void => {}
  }
};
export const navbarReducer = createReducer<NavbarReducerType>(defaultState, {
  [NavbarActionType.TOGGLE_TWOACTIONS](
    state: NavbarReducerType,
    action: Action<NavbarActionType.TOGGLE_TWOACTIONS, any>
  ): NavbarReducerType {
    return {
      ...state,
      navbarTwoButtons: { ...action.payload }
    };
  },

  [NavbarActionType.UPDATE_TWOACTIONS](
    state: NavbarReducerType,
    action: Action<NavbarActionType.UPDATE_TWOACTIONS, any>
  ): NavbarReducerType {
    return {
      ...state,
      navbarTwoButtons: {
        status: true,
        ...action.payload
      }
    };
  }
});
