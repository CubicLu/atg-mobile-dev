import { UserInterface } from "../";
import { GradientColorsInterface } from "../@commons";

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
}