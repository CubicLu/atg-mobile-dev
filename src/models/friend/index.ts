export interface FriendInterface {
  readonly name: string;
  readonly username: string;
  readonly nickname: string;
  readonly city: string;
  readonly image: string;
  readonly background?: string;
  readonly followers: number;
  readonly isFriend: boolean;
}

export interface GetFriendAPIInterface {
  readonly friendId: string;
}
