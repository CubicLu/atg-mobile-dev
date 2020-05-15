export interface PostSubscriptionInterface {
  artistId: string;
  subscriberId: string;
  subscriptionLevelId: string;
}

export interface SubscriptionInterface extends PostSubscriptionInterface {
  id: string;
}
