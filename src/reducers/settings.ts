/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Action, ActionType, TabsFanInterface } from './../interfaces';
import createReducer from './createReducer';
import {
  ProfileArtistsPage,
  ProfileFriendsPage,
  ProfileMixtapesPage,
  ProfileVaultPage
} from './../pages';

export interface SettingsReducerType {
  activeTab: string;
  activeFanTab: string;
  fanTabs: TabsFanInterface[];
}

const defaultState: SettingsReducerType = {
  activeTab: 'feed',
  activeFanTab: 'vault',
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
  ]
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
