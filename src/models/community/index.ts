import { UserInterface } from '../';
import {
  GradientColorsInterface,
  PostInterface,
  StorieInterface
} from '../@commons';

export interface CommunityDailyDripType {
  id: string;
  name: string;
  total: number;
  lastViewed: number;
  artistUsername: string;
  items: CommunityDailyDripItem[];
}
export interface CommunityDailyDripItem {
  id: string;
  createdAt: number;
  dripType: 'image' | 'video';
  href: string;
  duration: number;
}

export interface CommunityArtistInterface extends UserInterface {
  backgroundGradient: GradientColorsInterface | null;
  posts: PostInterface[];
  stories: StorieInterface[];
}

export interface RecentPostInterface {
  assetType: string;
  assetId: number | string;
  artistId: number | string;
  commentUrl: string;
  commentsCount: number;
  userAvatar: string;
  name: string;
  comment: string;
  date: string;
}
