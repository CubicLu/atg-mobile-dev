export interface FriendInterface {
  name: string;
  nickname: string;
  city: string;
  image: string;
  background?: string;
  followers: number;
  friend: boolean;
}

export interface GetFriendAPIInterface {
  friendId: string;
}
