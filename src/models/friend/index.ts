export interface FriendInterface {
  readonly name: string;
  readonly username: string;
  readonly nickname: string;
  readonly city: string;
  readonly image: string;
  readonly background?: string;
  readonly shortBio: string;
  readonly slides: FriendSlides[];
  readonly followers: number;
  readonly isFriend: boolean;
  readonly isArtist?: boolean;
}

export interface FriendSlides {
  readonly question: string;
  readonly answer: string;
}

export interface GetFriendAPIInterface {
  readonly friendId: string;
}
