/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Action, ActionType, NavbarReducerType } from '../interfaces';
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
  [ActionType.TOGGLE_NAVBAR_TWOACTIONS](
    state: NavbarReducerType,
    action: Action<any>
  ) {
    return {
      ...state,
      navbarTwoButtons: { ...action.payload }
    };
  },

  [ActionType.UPDATE_NAVBAR_TWOACTIONS](
    state: NavbarReducerType,
    action: Action<any>
  ) {
    return {
      ...state,
      navbarTwoButtons: {
        status: true,
        ...action.payload
      }
    };
  }
});
