import { Action, NavbarActionType, NavbarReducerType } from '../interfaces';
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
    action: Action<any>
  ) {
    return {
      ...state,
      navbarTwoButtons: { ...action.payload }
    };
  },

  [NavbarActionType.UPDATE_TWOACTIONS](
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
