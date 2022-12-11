import { IBabyStroller } from "./babyStroller";
import { IUser } from "./user";

export interface IComment {
   postText: string,
   userId: IUser,
   strollerId: IBabyStroller,
   _id: string;
   created_at: string;
   updatedAt: string;
   __v: number;
}