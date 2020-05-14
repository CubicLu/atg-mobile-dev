export interface CommentInterface {
  readonly text?: string;
  readonly user: UserCommentInterface;
  readonly replies?: CommentInterface[] | null;
}
interface UserCommentInterface {
  readonly name: string;
  readonly isFriend: boolean;
  readonly avatar: string;
  readonly username: string;
}

export interface CommentCoverInterface {
  readonly url: string;
  readonly username?: string;
  readonly description?: string;
}
