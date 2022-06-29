import { User } from './User';
export interface Post {
  post: string;
  image: any;
  comments: any;
  user: User;
  likes: number;
  id: number;
  posted_at: any;
  neighborhood: any;
}
