import { CommentInterface } from './../';
export interface PostInterface {
  id: string;
  username: string;
  artist: boolean;
  avatar: string;
  image: string | string[];
  commentsQuantity: number;
  comments: CommentInterface[];
}
