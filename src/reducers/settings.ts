/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Action, ActionType } from './../interfaces';
import createReducer from './createReducer';

export interface SettingsReducerType {
  activeTab: string;
}

const defaultState: SettingsReducerType = {
  activeTab: 'feed'
};

export const settingsReducer = createReducer<SettingsReducerType>(
  defaultState,
  {
    [ActionType.UPDATE_SETTINGS_PROPERTY](
      state: SettingsReducerType,
      action: Action<any>
    ) {
      return {
        ...state,
        [action.payload.property]: action.payload.value
      };
    }
  }
);
