import { MenuInterface } from '../../models';
import {
  ProfileArtistsPage,
  ProfileVaultPage,
  ProfileMixtapesPage,
  ProfileFriendsPage
} from '../../pages';

export const myProfileTabs: MenuInterface[] = [
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
];
