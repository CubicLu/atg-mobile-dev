import { TabsInterface } from './../../interfaces';
import {
  FeedPage,
  CommunityPage,
  ProfilePage,
  RadioPage,
  SearchPage
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
];
