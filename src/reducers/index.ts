import { combineReducers } from 'redux';
import { settingsReducer } from './settings';
import { artistReducer } from './api/artistReducer';
import { authReducer } from './api/authReducer';

import {
  SettingsReducerType,
  AuthReducerType,
  ArtistReducerType
} from './../interfaces';

export interface ApplicationState {
  settings: SettingsReducerType;
  artistAPI: ArtistReducerType;
  authAPI: AuthReducerType;
}

export const rootReducers = combineReducers<ApplicationState>({
  settings: settingsReducer,
  artistAPI: artistReducer,
  authAPI: authReducer
});
