import { CommentInterface, CommentCoverInterface, StorieInterface, CommunityArtistInterface, PostInterface } from "../";

export interface CommunityReducerType {
    posts: PostInterface[];
    stories: StorieInterface[];
    currentCommunityArtist: CommunityArtistInterface | null;
    loading: boolean;
    errorMessage: string | null;
    successMessage: string | null;
    currentPostComments: CommentInterface[] | null;
    currentPostCover: CommentCoverInterface;
  }
  