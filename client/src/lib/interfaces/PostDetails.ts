import { User } from './User';

export interface PostDetails {
  id: number;
  title: string;
  imageUrl: string;
  body: string;
  createdAt: Date;
  user: User;
  favoriteCount: number;
  commentCount: number;
}
