/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Action, ActionType, SettingsReducerType } from './../interfaces';
import createReducer from './createReducer';
import {
  ProfileArtistsPage,
  ProfileFriendsPage,
  ProfileMixtapesPage,
  ProfileVaultPage
} from './../pages';

const defaultState: SettingsReducerType = {
  activeTab: 'feed',
  activeFanTab: 'artists',
  isPlaying: true,
  fanTabs: [
    {
      id: 'artists',
      label: 'Artists',
      icon: 'a',
      component: ProfileArtistsPage
    },
    {
      id: 'vault',
      label: 'Vault',
      icon: 'v',
      component: ProfileVaultPage
    },
    {
      id: 'mixtapes',
      label: 'Mixtapes',
      icon: 'm',
      component: ProfileMixtapesPage
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: 'f',
      component: ProfileFriendsPage
    }
  ],
  artistTabs: [
    {
      id: 'features',
      label: 'Features',
      icon: 'f',
      component: ProfileArtistsPage
    },
    {
      id: 'biography',
      label: 'Biography',
      icon: 'b',
      component: ProfileVaultPage
    },
    {
      id: 'discography',
      label: 'Discography',
      icon: 'd',
      component: ProfileMixtapesPage
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: 'g',
      component: ProfileFriendsPage
    },
    {
      id: 'events',
      label: 'Events',
      icon: 'e',
      component: ProfileFriendsPage
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: 'v',
      component: ProfileFriendsPage
    },
    {
      id: 'deep',
      label: 'Deep',
      icon: 'd',
      component: ProfileFriendsPage
    }
  ],
  activeArtistTab: 'features'
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
