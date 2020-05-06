import {  SettingsActionType, MenuInterface } from '../../interfaces';
import { ArtistFeaturesPage, ArtistDiscographyPage } from '../../pages';
import { store } from '../../store';
import React from 'react';
import { MenuArtistList } from '../../components';

export const artistTabs: MenuInterface[] = [
  {
    id: 'features',
    label: 'Featured',
    icon: 'f',
    component: ArtistFeaturesPage
  },
  {
    id: 'biography',
    label: 'Bio',
    icon: 'b',
    isPage: true,
    route: '/artist/:id/biography'
  },
  {
    id: 'discography',
    label: 'Albums',
    icon: 'd',
    component: ArtistDiscographyPage
  },
  {
    id: 'gallery',
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
    id: 'deep',
    label: 'Deep Dive',
    icon: 'd',
    isPage: true,
    route: '/artist/:id/deep-dive'
  },
  {
    id: 'community',
    label: 'Community',
    icon: 'c',
    isPage: true,
    route: '/community/artist/:id'
  },
  {
    id: 'radio',
    label: 'Radio',
    icon: 'r',
    isPage: true,
    route: '/radio'
  },
  {
    id: 'similar',
    label: 'Matches ',
    icon: 's',
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
