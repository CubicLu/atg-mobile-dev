/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Action, ActionType, SettingsReducerType } from './../interfaces';
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
  ArtistGalleryPage,
  ArtistEventsPage,
  ArtistVideosPage
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
      component: ArtistGalleryPage
    },
    {
      id: 'events',
      label: 'Events',
      icon: 'e',
      component: ArtistEventsPage
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
    }
  ],
  activeArtistTab: 'features',
  modal: {
    visible: false,
    content: null
  }
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
