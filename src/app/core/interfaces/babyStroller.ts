import { IComment } from './comment';
import { IUser } from './user';

export interface IBabyStroller {
  babyStrollerBrand: string;
  imageUrl: string;
  year: number;
  price: number;
  condition: string;
  likes: string[];
  comments: IComment[];
  userId: IUser;
  status: string;
  _id: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}