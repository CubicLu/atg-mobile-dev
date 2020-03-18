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
  ArtistFeaturesPage,
  ArtistDiscographyPage,
  ArtistVideosPage,
  ArtistSupportPage,
  ArtistGalleryPage,
  ArtistBiographyPage,
  ArtistEventsPage,
  ArtistPage,
  FeedPage,
  MessagesPage,
  ProfilePage,
  SearchPage,
  RadioPage,
  ArtistEventDetailPage,
  ArtistDeepDiveLyricsPage,
  ArtistDeepDivePedigreePage,
  ArtistDeepDiveCataloguePage,
  ArtistDeepDivePage
} from './../pages';
import {
  MenuArtistList,
  MessageIcon,
  ProfileIcon,
  SearchIcon,
  RadioIcon
} from './../components';
import React from 'react';
import { store } from '../store';
import LogoIcon from '../components/icon/logo';

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
      isPage: true,
      route: '/home/artist/:id/biography'
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
      isPage: true,
      route: '/home/artist/:id/deep-dive'
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
  selectedPlan: null,
  tabs: [
    {
      path: '/home/artist/:id/support',
      id: 'profile',
      component: ArtistSupportPage,
      show: false
    },
    {
      path: '/home/artist/:id/gallery',
      id: 'profile',
      component: ArtistGalleryPage,
      show: false
    },
    {
      path: '/home/artist/:id/biography',
      id: 'profile',
      component: ArtistBiographyPage,
      show: false
    },
    {
      path: '/home/artist/:id/deep-dive',
      id: 'profile',
      component: ArtistDeepDivePage,
      show: false
    },
    {
      path: '/home/artist/:id/event/:eventId',
      id: 'profile',
      component: ArtistEventDetailPage,
      show: false
    },
    {
      path: '/home/artist/:id/event',
      id: 'profile',
      component: ArtistEventsPage,
      show: false
    },
    {
      path: '/home/artist/:id',
      id: 'profile',
      component: ArtistPage,
      show: false
    },
    {
      path: '/home/feed',
      icon: LogoIcon,
      id: 'feed',
      component: FeedPage,
      redirect: true
    },
    {
      path: '/home/messages',
      icon: MessageIcon,
      id: 'messages',
      component: MessagesPage
    },
    {
      path: '/home/profile',
      icon: ProfileIcon,
      id: 'profile',
      component: ProfilePage
    },
    {
      path: '/home/search',
      icon: SearchIcon,
      id: 'search',
      component: SearchPage
    },
    {
      path: '/home/radio',
      icon: RadioIcon,
      id: 'radio',
      component: RadioPage
    }
  ],
  activeDeepDiveTab: 'lyrics',
  deepDiveTabs: [
    {
      id: 'lyrics',
      label: 'Lyrics',
      icon: 'l',
      component: ArtistDeepDiveLyricsPage
    },
    {
      id: 'pedigree',
      label: 'Pedigree',
      icon: 'p',
      component: ArtistDeepDivePedigreePage
    },
    {
      id: 'catalogue',
      label: 'Catalogue',
      icon: 'c',
      component: ArtistDeepDiveCataloguePage
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
