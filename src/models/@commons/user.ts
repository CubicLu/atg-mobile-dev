export interface UserInterface {
  readonly id: number;
  readonly name: string;
  readonly nickname?: string;
  readonly image: string;
  readonly username: string;
  readonly city: string;
  readonly followers: number;
  readonly isFriend: boolean;
  readonly isArtist: boolean;
  readonly background?: string;
  readonly fullname?: string;
  readonly email?: string;
}
