import { combineReducers } from 'redux';
import { settingsReducer } from './settings';
import { artistReducer } from './api/artistReducer';
import { authReducer } from './api/authReducer';
import { playerReducer } from './playerReducer';
import { communityReducer } from './api/communityReducer';
import { searchReducer } from './api/searchReducer';
import {
  SettingsReducerType,
  AuthReducerType,
  ArtistReducerType,
  PlayerReducerType,
  CommunityReducerType,
  SearchReducerType
} from '../interfaces';

export interface ApplicationState {
  settings: SettingsReducerType;
  artistAPI: ArtistReducerType;
  authAPI: AuthReducerType;
  player: PlayerReducerType;
  communityAPI: CommunityReducerType;
  searchAPI: SearchReducerType;
}

export const rootReducers = combineReducers<ApplicationState>({
  settings: settingsReducer,
  artistAPI: artistReducer,
  authAPI: authReducer,
  player: playerReducer,
  communityAPI: communityReducer,
  searchAPI: searchReducer
});
