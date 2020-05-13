import { UserInterface } from './../';
export interface CommentInterface {
  readonly text?: string;
  readonly user: UserInterface;
  readonly replies?: CommentInterface[] | null;
}

export interface CommentCoverInterface {
  readonly url: string;
  readonly username?: string;
  readonly description?: string;
}
