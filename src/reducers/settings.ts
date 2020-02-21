/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Action, ActionType, SettingsReducerType } from './../interfaces';
import createReducer from './createReducer';

const defaultState: SettingsReducerType = {
  activeTab: 'feed',
  isPlaying: true
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
