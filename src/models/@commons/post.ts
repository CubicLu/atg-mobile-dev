import { CommentInterface } from './../';

export interface PostInterface {
  username: string;
  avatar: string;
  image: string;
  commentsQuantity: number;
  comments: CommentInterface[];
}
