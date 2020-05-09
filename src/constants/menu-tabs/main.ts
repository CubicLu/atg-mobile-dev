import { TabsInterface } from './../../interfaces';
import {
  CommunityPage,
  ProfilePage,
  RadioPage,
  SearchPage,
  DiscoveryPage
} from '../../pages';
import {
  MessageIcon,
  ProfileIcon,
  LogoIcon,
  RadioIcon,
  SearchIcon
} from '../../components';
export const mainTabs: TabsInterface[] = [
  {
    path: '/discovery',
    icon: LogoIcon,
    id: 'discovery',
    component: DiscoveryPage
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
];
