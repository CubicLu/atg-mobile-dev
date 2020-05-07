import {
  PostInterface,
  StorieInterface,
  CommentInterface,
  CommentCoverInterface,
  CommunityArtistInterface
} from '../';

export interface FeedReducerType {
  posts: PostInterface[];
  stories: StorieInterface[];
  currentCommunityArtist: CommunityArtistInterface | null;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  currentPostComments: CommentInterface[] | null;
  currentPostCover: CommentCoverInterface;
  queryResult: string;
}
