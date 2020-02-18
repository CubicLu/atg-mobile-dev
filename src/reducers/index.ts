import { combineReducers } from 'redux';
import {  SettingsReducerType, settingsReducer } from "./settings"


export interface ApplitcationState {
    settings: SettingsReducerType
}

export const rootReducers = combineReducers<ApplitcationState>({
    settings: settingsReducer
});
