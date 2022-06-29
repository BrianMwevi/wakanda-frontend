import { User } from './User';

export interface Comment {
  id?: number;
  comment: string;
  post: number;
  likes?: number;
  user?: User;
  posted_at?: any;
}
