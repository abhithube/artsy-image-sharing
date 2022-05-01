import { User } from './User';

export interface Comment {
  id: number;
  body: string;
  user: User;
  createdAt: Date;
}
