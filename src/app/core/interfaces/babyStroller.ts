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
  _id: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}