import { ArtistBetaInterface } from '../artist';

export default {};

export interface SubscriberArtistSupportedInterface {
  subscriberId: number;
  artistId: number;
  subscriptionLevelId: number;
  id: number;
  artist: ArtistBetaInterface;
  subscriptionLevel: SubscriptionLevelInterface;
}
export interface SubscriptionLevelInterface {
  id: number;
  name: string;
  value: number;
}
