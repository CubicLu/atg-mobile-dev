import { SettingsActionType, MenuInterface } from '../../models';
import { ArtistFeaturesPage, ArtistDiscographyPage } from '../../pages';
import { store } from '../../store';
import React from 'react';
import { MenuArtistList } from '../../components';

export const artistTabs: MenuInterface[] = [
  {
    id: 'featured',
    label: 'Featured',
    icon: 'f',
    isPage: false,
    component: ArtistFeaturesPage
  },
  {
    id: 'bio',
    label: 'Bio',
    icon: 'b',
    isPage: true,
    route: '/artist/:id/biography'
  },
  {
    id: 'albums',
    label: 'Albums',
    icon: 'a',
    isPage: false,
    component: ArtistDiscographyPage
  },
  {
    id: 'photos',
    label: 'Photos',
    icon: 'p',
    isPage: true,
    route: '/artist/:id/gallery'
  },
  {
    id: 'videos',
    label: 'Videos',
    icon: 'v',
    isPage: true,
    route: '/artist/:id/video'
  },
  {
    id: 'events',
    label: 'Events',
    icon: 'e',
    isPage: true,
    route: '/artist/:id/event'
  },
  {
    id: 'deepdive',
    label: 'Deep Dive',
    icon: 'd',
    isPage: true,
    route: '/artist/:id/deep-dive'
  },
  {
    id: 'social',
    label: 'Community',
    icon: 's',
    isPage: true,
    route: '/community/artist/:id'
  },
  {
    id: 'radio',
    label: 'Radio',
    icon: 'r',
    isPage: true,
    route: '/radio/:id'
  },
  {
    id: 'matches',
    label: 'Matches ',
    icon: 'm',
    onClick: (): void => {
      store.dispatch({
        type: SettingsActionType.UPDATE_MODAL,
        payload: {
          visible: true,
          content: React.createElement(MenuArtistList, {
            title: 'Similar Artist',
            isSimilar: true,
            onClick: (): void => {
              store.dispatch({
                type: SettingsActionType.UPDATE_MODAL,
                payload: { content: null }
              });
            },
            background: 'background-white-base'
          })
        }
      });
    }
  }
];
