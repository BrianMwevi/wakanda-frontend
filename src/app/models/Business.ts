import { User } from './User';
export interface Business {
  id?: number;
  name: string;
  email: string;
  established?: any;
  user: User;
  neighborhood: number;
}
