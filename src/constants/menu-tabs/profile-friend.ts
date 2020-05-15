import { MenuInterface } from '../../models';
import {
  MyBioPage,
  ProfileArtistsPage,
  ProfileMixtapesPage,
  ProfileVaultPage
} from '../../pages';

export const profileFriendTabs: MenuInterface[] = [
  {
    id: 'my-bio',
    label: 'My Bio',
    icon: 'f',
    component: MyBioPage
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
