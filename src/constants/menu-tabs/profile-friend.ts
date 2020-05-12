import { MenuInterface } from '../../models';
import {
  ProfileArtistsPage,
  ProfileMixtapesPage,
  ProfileVaultPage
} from '../../pages';

export const profileFriendTabs: MenuInterface[] = [
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
];
