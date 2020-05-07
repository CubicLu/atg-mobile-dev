export interface FriendInterface {
  name: string;
  city: string;
  followers: number;
  friend: boolean;
}

export interface GetFriendAPIInterface {
  friendId: string;
}
