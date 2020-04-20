import { combineReducers } from 'redux';
import { settingsReducer } from './settingsReducer';
import { artistReducer } from './api/artistReducer';
import { authReducer } from './api/authReducer';
import { playerReducer } from './playerReducer';
import { communityReducer } from './api/communityReducer';
import { searchReducer } from './api/searchReducer';
import { friendReducer } from './api/friendsReducer';
import { feedReducer } from './api/feedReducer';
import {
  SettingsReducerType,
  AuthReducerType,
  ArtistReducerType,
  PlayerReducerType,
  CommunityReducerType,
  SearchReducerType,
  ProfileReducerType,
  FriendReducerType,
  FeedReducerType,
  RadioReducerType,
  NavbarReducerType
} from '../interfaces';
import { profileReducer } from './api/profileReducer';
import { radioReducer } from './api/radioReducer';
import { navbarReducer } from './navbarReducer';

export interface ApplicationState {
  settings: SettingsReducerType;
  navbar: NavbarReducerType;
  artistAPI: ArtistReducerType;
  authAPI: AuthReducerType;
  player: PlayerReducerType;
  communityAPI: CommunityReducerType;
  searchAPI: SearchReducerType;
  profileAPI: ProfileReducerType;
  friendAPI: FriendReducerType;
  feedAPI: FeedReducerType;
  radioAPI: RadioReducerType;
}

export const rootReducers = combineReducers<ApplicationState>({
  settings: settingsReducer,
  navbar: navbarReducer,
  artistAPI: artistReducer,
  authAPI: authReducer,
  player: playerReducer,
  communityAPI: communityReducer,
  searchAPI: searchReducer,
  profileAPI: profileReducer,
  friendAPI: friendReducer,
  feedAPI: feedReducer,
  radioAPI: radioReducer
});
