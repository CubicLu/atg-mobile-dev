import { combineReducers } from 'redux';
import { settingsReducer } from './settingsReducer';
import { artistReducer } from './api/artistReducer';
import { authReducer } from './api/authReducer';
import { playerReducer } from './playerReducer';
import { communityReducer } from './api/communityReducer';
import { searchReducer } from './api/searchReducer';
import { wizardReducer } from './api/wizardReducer';
import { friendReducer } from './api/friendsReducer';
import { feedReducer } from './api/feedReducer';
import { profileReducer } from './api/profileReducer';
import { radioReducer } from './api/radioReducer';
import { navbarReducer } from './navbarReducer';
import { dashboardReducer } from './api/dashboardReducer';
import { subscriberReducer } from './api/subscriberReducer';
import {
  SettingsReducerType,
  AuthReducerType,
  ArtistReducerType,
  PlayerReducerType,
  CommunityReducerType,
  SearchReducerType,
  WizardReducerType,
  ProfileReducerType,
  FriendReducerType,
  FeedReducerType,
  RadioReducerType,
  NavbarReducerType,
  DashboardReducerType,
  SubscriberReducerType
} from '../models';

export interface ApplicationState {
  settings: SettingsReducerType;
  navbar: NavbarReducerType;
  artistAPI: ArtistReducerType;
  authAPI: AuthReducerType;
  player: PlayerReducerType;
  communityAPI: CommunityReducerType;
  searchAPI: SearchReducerType;
  wizardAPI: WizardReducerType;
  profileAPI: ProfileReducerType;
  friendAPI: FriendReducerType;
  feedAPI: FeedReducerType;
  radioAPI: RadioReducerType;
  dashboardAPI: DashboardReducerType;
  subscriberAPI: SubscriberReducerType;
}

export const rootReducers = combineReducers<ApplicationState>({
  settings: settingsReducer,
  navbar: navbarReducer,
  artistAPI: artistReducer,
  authAPI: authReducer,
  player: playerReducer,
  communityAPI: communityReducer,
  searchAPI: searchReducer,
  wizardAPI: wizardReducer,
  profileAPI: profileReducer,
  friendAPI: friendReducer,
  feedAPI: feedReducer,
  radioAPI: radioReducer,
  dashboardAPI: dashboardReducer,
  subscriberAPI: subscriberReducer
});
