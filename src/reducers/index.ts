import { combineReducers } from 'redux';
import { settingsReducer } from './settings';
import { SettingsReducerType } from './../interfaces';

export interface ApplitcationState {
  settings: SettingsReducerType;
}

export const rootReducers = combineReducers<ApplitcationState>({
  settings: settingsReducer
});
