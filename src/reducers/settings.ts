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
  ArtistVideoDetailPage,
  CommunityDailyDripPage,
  CommunityAllArtistsPage,
  ProfileMixtapesPage,
  RadioFilterPage,
  MessagePage,
  MessageChatPage,
  MessageNotificationsPage,
  RadioArtistPage,
  RadioHistoryPage,
  MessageSelectContactPage,
  MessageNotificationDetailPage
} from './../pages';
import {
  MenuArtistList,
  MessageIcon,
  ProfileIcon,
  SearchIcon,
  RadioIcon,
  ListUser
} from './../components';
import React from 'react';
import { store } from '../store';
import LogoIcon from '../components/icon/logo';

const defaultState: SettingsReducerType = {
  modal: {
    content: null,
    height: 40,
    onClick: (): void => {},
    onClose: (): void => {},
    onClosing: (): void => {},
    onOpen: (): void => {}
  },
  activeFanTab: 'artists',
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
  activeProfileFriendTab: 'fan-profile',
  profileFriendTabs: [
    {
      id: 'fan-profile',
      label: 'Fan Profile',
      icon: 'f',
      component: ProfileArtistsPage
    },
    {
      id: 'artists',
      label: 'Artists',
      icon: 'a',
      component: ProfileArtistsPage
    },
    {
      id: 'mixtapes',
      label: 'Mixtapes',
      icon: 'm',
      component: ProfileMixtapesPage
    },
    {
      id: 'vault',
      label: 'Vault',
      icon: 'v',
      component: ProfileVaultPage
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
      route: '/artist/:id/biography'
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
      route: '/artist/:id/gallery'
    },
    {
      id: 'events',
      label: 'Events',
      icon: 'e',
      isPage: true,
      route: '/artist/:id/event'
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: 'v',
      isPage: true,
      route: '/artist/:id/video'
    },
    {
      id: 'deep',
      label: 'Deep',
      icon: 'd',
      isPage: true,
      route: '/artist/:id/deep-dive'
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
                  payload: { content: null }
                });
              },
              background: 'background-white-base'
            })
          }
        });
      }
    }
  ],
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
      path: '/artist/:id',
      id: 'artistPage',
      component: ArtistPage
    },
    {
      path: '/',
      id: 'profilePageInitial',
      component: ProfilePage
    },
    {
      path: '/profile/:id',
      id: 'profileFriend',
      component: ProfilePage
    },
    {
      path: '/artist/:id/support',
      id: 'artistSupport',
      component: ArtistSupportPage
    },
    {
      path: '/artist/:id/gallery/:galleryId/image',
      id: 'profileGallery',
      component: ArtistGalleryPhotoPage
    },
    {
      path: '/artist/:id/gallery/:galleryId',
      id: 'profileGalleryGrid',
      component: ArtistGalleryGridPage
    },
    {
      path: '/artist/:id/deep-dive',
      id: 'artistDeepDive',
      component: ArtistDeepDivePage
    },
    {
      path: '/artist/:id/event/:eventId',
      id: 'artistEvent',
      component: ArtistEventDetailPage
    },
    {
      path: '/artist/:id/gallery',
      id: 'artistGallery',
      component: ArtistGalleryPage
    },
    {
      path: '/artist/:id/biography',
      id: 'artistBiography',
      component: ArtistBiographyPage
    },
    {
      path: '/artist/:id/event/:eventId',
      id: 'artistEventDetail',
      component: ArtistEventDetailPage
    },
    {
      path: '/artist/:id/event',
      id: 'artistEvents',
      component: ArtistEventsPage
    },
    {
      path: '/community/comments/:id',
      id: 'communityComments',
      component: CommunityPostPage
    },
    {
      path: '/track/:reference/:referenceId/:id',
      id: 'tracklist',
      component: TrackListPage
    },
    {
      path: '/community/:artistId/daily-drip/:dailyDripId',
      id: 'communityArtistDailyDrip',
      component: CommunityDailyDripPage
    },
    {
      path: '/community/artist',
      id: 'communityArtist',
      component: CommunityAllArtistsPage
    },
    {
      path: '/community/:artistId',
      id: 'communityArtist',
      component: CommunityPage
    },
    {
      path: '/thank-you',
      id: 'thankYou',
      component: ThankYouPage
    },
    {
      path: '/artist/:id/video/:videoId',
      id: 'artistVideo',
      component: ArtistVideoDetailPage
    },
    {
      path: '/artist/:id/video',
      id: 'artistVideos',
      component: ArtistVideosPage
    },
    {
      path: '/radio/filter',
      id: 'radioFilter',
      component: RadioFilterPage
    },
    {
      path: '/radio/genre/:genre',
      id: 'radioHome',
      component: RadioPage
    },
    {
      path: '/message/notification/:id',
      id: 'message-notification',
      component: MessageNotificationDetailPage
    },
    {
      path: '/message/chat/new',
      id: 'message-chat-new',
      component: MessageSelectContactPage
    },
    {
      path: '/message/chat/:id',
      id: 'message-chat-by-id',
      component: MessageSelectContactPage
    },
    {
      path: '/message/select-contact',
      id: 'message-select-contact',
      component: MessageSelectContactPage
    },
    {
      path: '/message',
      id: 'message',
      component: MessagePage
    },
    {
      path: '/radio/:id',
      id: 'radioArtist',
      component: RadioArtistPage
    },
    {
      path: '/radio/:id/history',
      id: 'radioHistory',
      component: RadioHistoryPage
    }
  ],

  tabs: [
    {
      path: '/feed',
      icon: LogoIcon,
      id: 'feed',
      component: FeedPage
    },
    {
      path: '/community',
      icon: MessageIcon,
      id: 'community',
      component: CommunityPage
    },
    {
      path: '/profile',
      icon: ProfileIcon,
      id: 'profile',
      component: ProfilePage
    },
    {
      path: '/search',
      icon: SearchIcon,
      id: 'search',
      component: SearchPage
    },
    {
      path: '/radio',
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
  ],
  messageTabs: [
    {
      id: 'chat',
      label: 'Chat',
      icon: '',
      component: MessageChatPage
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: '',
      component: MessageNotificationsPage
    }
  ],
  activeMessageTab: 'chat',
  selectContactTabs: [
    {
      label: 'Artists',
      id: 'artists',
      component: ListUser,
      icon: ''
    },
    {
      label: 'Friends',
      id: 'friends',
      component: ListUser,
      icon: ''
    },
    {
      label: 'Admins',
      id: 'admins',
      component: ListUser,
      icon: ''
    }
  ],
  activeSelectContactTab: 'friends'
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
