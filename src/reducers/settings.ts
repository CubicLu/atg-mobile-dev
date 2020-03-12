/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Action,
  ActionType,
  SettingsReducerType,
  Colors
} from './../interfaces';
import createReducer from './createReducer';
import {
  ProfileArtistsPage,
  ProfileFriendsPage,
  ProfileMixtapesPage,
  ProfileVaultPage,
  ArtistDeepPage,
  ArtistFeaturesPage,
  ArtistBiographyPage,
  ArtistDiscographyPage,
  ArtistVideosPage
} from './../pages';
import { MenuArtistList } from './../components';
import React from 'react';
import { store } from '../store';

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
      component: ArtistFeaturesPage
    },
    {
      id: 'biography',
      label: 'Biography',
      icon: 'b',
      component: ArtistBiographyPage
    },
    {
      id: 'discography',
      label: 'Discography',
      icon: 'd',
      component: ArtistDiscographyPage
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: 'g',
      isPage: true,
      route: '/home/artist/:id/gallery'
    },
    {
      id: 'events',
      label: 'Events',
      icon: 'e',
      isPage: true,
      route: '/home/artist/:id/event'
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: 'v',
      component: ArtistVideosPage
    },
    {
      id: 'deep',
      label: 'Deep',
      icon: 'd',
      component: ArtistDeepPage
    },
    {
      id: 'similar',
      label: 'Similar',
      icon: 'S',
      onClick: (): void => {
        store.dispatch({
          type: ActionType.UPDATE_SETTINGS_MODAL,
          payload: {
            visible: true,
            content: React.createElement(MenuArtistList, {
              title: 'Similar Artist',
              isSimilar: true,
              onClick: (): void => {
                store.dispatch({
                  type: ActionType.UPDATE_SETTINGS_MODAL,
                  payload: { visible: false, content: null }
                });
              },
              background: 'background-white-base'
            }),
            classname: 'background-white-base'
          }
        });
      }
    }
  ],
  activeArtistTab: 'features',
  modal: {
    visible: false,
    content: null
  },
  plans: [
    {
      name: 'Basic',
      price: '.69',
      color: Colors.orange,
      id: 1,
      description:
        'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
    },
    {
      name: 'Platinum',
      price: '.89',
      color: Colors.yellow,
      id: 3,
      description:
        'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
    },
    {
      name: 'Gold',
      price: '.79',
      color: Colors.blue,
      id: 2,
      description:
        'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
    },
    {
      name: 'Diamond',
      price: '.99',
      color: Colors.green,
      id: 4,
      description:
        'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
    }
  ],
  selectedPlan: null
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
    },
    [ActionType.UPDATE_SETTINGS_MODAL](
      state: SettingsReducerType,
      action: Action<any>
    ) {
      return {
        ...state,
        modal: { ...action.payload }
      };
    }
  }
);
