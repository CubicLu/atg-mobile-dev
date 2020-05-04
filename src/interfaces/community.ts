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
