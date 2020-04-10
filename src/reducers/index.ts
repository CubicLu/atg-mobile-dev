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
  SearchReducerType,
  ProfileReducerType,
  RadioReducerType
} from '../interfaces';
import { profileReducer } from './api/profileReducer';
import { radioReducer } from './api/radioReducer';

export interface ApplicationState {
  settings: SettingsReducerType;
  artistAPI: ArtistReducerType;
  authAPI: AuthReducerType;
  player: PlayerReducerType;
  communityAPI: CommunityReducerType;
  searchAPI: SearchReducerType;
  profileAPI: ProfileReducerType;
  radioAPI: RadioReducerType;
}

export const rootReducers = combineReducers<ApplicationState>({
  settings: settingsReducer,
  artistAPI: artistReducer,
  authAPI: authReducer,
  player: playerReducer,
  communityAPI: communityReducer,
  searchAPI: searchReducer,
  profileAPI: profileReducer,
  radioAPI: radioReducer
});
