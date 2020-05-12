import { CommentInterface } from './../';
export interface PostInterface {
  readonly id: string;
  readonly username: string;
  readonly artist: boolean;
  readonly avatar: string;
  readonly image: string | string[];
  readonly commentsQuantity: number;
  readonly comments: CommentInterface[];
}
