import { UserInterface } from './../'
export interface CommentInterface {
    text?: string;
    user: UserInterface;
    replies?: CommentInterface[] | null;
  }

  export interface CommentCoverInterface {
    url: string;
  }
  