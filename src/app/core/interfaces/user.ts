import { IBabyStroller } from "./babyStroller";

export interface IUser {
    babyStrollers: IBabyStroller[];
    tel: string;
    email: string;
    username: string;
    password: string;
    _id: string;
    created_at: string;
    updatedAt: string;
    __v: number;
}