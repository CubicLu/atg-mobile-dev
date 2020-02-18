import { Action, ActionType } from "./../interfaces";
import createReducer from "./createReducer";

export interface SettingsReducerType {
  active_tab: string;
}

const defaultState: SettingsReducerType = {
  active_tab: "feed"
};

export const settingsReducer = createReducer<SettingsReducerType>(defaultState, {
  [ActionType.UPDATE_SETTINGS_PROPERTY](state: SettingsReducerType, action: Action<any>) {
    return {
      ...state, [action.payload.property]:  action.payload.value
    };
  }
});
