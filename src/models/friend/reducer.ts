import { FriendInterface } from './../';
import { Nullable } from './../../types';

export interface FriendReducerType {
  readonly friends: FriendInterface[];
  readonly currentFriend: Nullable<FriendInterface>;
  readonly loading: boolean;
  readonly successMessage: Nullable<string>;
  readonly errorMessage: Nullable<string>;
}
