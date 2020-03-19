import { combineReducers } from 'redux';
import { settingsReducer } from './settings';
import { artistReducer } from './api/artistReducer';
import { authReducer } from './api/authReducer';
import { playerReducer } from './playerReducer';
import {
  SettingsReducerType,
  AuthReducerType,
  ArtistReducerType,
  PlayerReducerType
} from './../interfaces';

export interface ApplicationState {
  settings: SettingsReducerType;
  artistAPI: ArtistReducerType;
  authAPI: AuthReducerType;
  player: PlayerReducerType;
}

export const rootReducers = combineReducers<ApplicationState>({
  settings: settingsReducer,
  artistAPI: artistReducer,
  authAPI: authReducer,
  player: playerReducer
});
