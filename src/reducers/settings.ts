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
  CommunityPage,
  ProfilePage,
  SearchPage,
  RadioPage,
  ArtistEventDetailPage,
  ArtistDeepDiveLyricsPage,
  ArtistDeepDivePedigreePage,
  ArtistDeepDiveCataloguePage,
  ArtistDeepDivePage,
  ArtistGalleryPhotoPage,
  ArtistGalleryGridPage,
  CommunityPostPage,
  TrackListPage,
  ThankYouPage,
  CommunityDailyDripPage,
  CommunityAllArtistsPage,
  ProfileMixtapesPage,
  RadioFilterPage
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
  activeTab: 'profile',
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
      isPage: true,
      route: '/home/artist/:id/video'
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
      icon: 's',
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
      price: '0.69',
      color: Colors.orange,
      id: 1,
      description:
        'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
    },
    {
      name: 'Platinum',
      price: '0.89',
      color: Colors.tertiary,
      id: 3,
      description:
        'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
    },
    {
      name: 'Gold',
      price: '0.79',
      color: Colors.lightBlue,
      id: 2,
      description:
        'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
    },
    {
      name: 'Diamond',
      price: '0.99',
      color: Colors.green,
      id: 4,
      description:
        'Welcome to Panthr Platinum and thank you for your support. Platinum support level allows the user to experience and listen to music. There is access to discovery for a limited time. Enjoy the Panthr experience.'
    }
  ],
  selectedPlan: null,

  links: [
    {
      path: '/home/artist/:id',
      id: 'artistPage',
      component: ArtistPage
    },
    {
      path: '/home/artist/:id/support',
      id: 'artistSupport',
      component: ArtistSupportPage
    },
    {
      path: '/home/artist/:id/gallery/:galleryId/image',
      id: 'profile',
      component: ArtistGalleryPhotoPage
    },
    {
      path: '/home/artist/:id/gallery/:galleryId',
      id: 'profile',
      component: ArtistGalleryGridPage
    },
    {
      path: '/home/artist/:id/deep-dive',
      id: 'profile',
      component: ArtistDeepDivePage
    },
    {
      path: '/home/artist/:id/event/:eventId',
      id: 'profile',
      component: ArtistEventDetailPage
    },
    {
      path: '/home/artist/:id/gallery',
      id: 'artistGallery',
      component: ArtistGalleryPage
    },
    {
      path: '/home/artist/:id/biography',
      id: 'artistBiography',
      component: ArtistBiographyPage
    },
    {
      path: '/home/artist/:id/event/:eventId',
      id: 'artistEventDetail',
      component: ArtistEventDetailPage
    },
    {
      path: '/home/artist/:id/event',
      id: 'artistEvents',
      component: ArtistEventsPage
    },
    {
      path: '/home/community/comments/:id',
      id: 'communityComments',
      component: CommunityPostPage
    },
    {
      path: '/home/track/:reference/:referenceId/:id',
      id: 'b',
      component: TrackListPage
    },
    {
      path: '/home/community/:artistId/daily-drip/:dailyDripId',
      id: 'community',
      component: CommunityDailyDripPage
    },
    {
      path: '/home/community/artist',
      id: 'communityArtist',
      component: CommunityAllArtistsPage
    },
    {
      path: '/home/community/:artistId',
      id: 'community',
      component: CommunityPage
    },
    {
      path: '/home/thank-you',
      id: 'thankYou',
      component: ThankYouPage
    },
    {
      path: '/home/artist/:id/video',
      id: 'artistVideos',
      component: ArtistVideosPage
    },
    {
      path: '/home/radio/filter',
      id: 'radioFilter',
      component: RadioFilterPage
    },
    {
      path: '/home/radio/genre/:genre',
      id: 'radioHome',
      component: RadioPage
    }
  ],

  tabs: [
    {
      path: '/home/feed',
      icon: LogoIcon,
      id: 'feed',
      component: FeedPage
    },
    {
      path: '/home/community',
      icon: MessageIcon,
      id: 'community',
      component: CommunityPage
    },
    {
      path: '/home',
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
