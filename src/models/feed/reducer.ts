import {
  PostInterface,
  StorieInterface,
  CommentInterface,
  CommentCoverInterface,
  CommunityArtistInterface
} from '../';
import { Nullable } from './../../types';

export interface FeedReducerType {
  readonly posts: PostInterface[];
  readonly stories: StorieInterface[];
  readonly currentCommunityArtist: Nullable<CommunityArtistInterface>;
  readonly loading: boolean;
  readonly errorMessage: Nullable<string>;
  readonly successMessage: Nullable<string>;
  readonly currentPostComments: Nullable<CommentInterface[]>;
  readonly currentPostCover: CommentCoverInterface;
  readonly queryResult: string;
}
