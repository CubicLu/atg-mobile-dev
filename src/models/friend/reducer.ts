import { FriendInterface } from './../';

export interface FriendReducerType {
  friends: FriendInterface[];
  currentFriend: FriendInterface | null;
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}
