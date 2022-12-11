import { createAction, props } from "@ngrx/store";
import { IUser } from "../core/interfaces";


const currentUserDomain = '[CurrentUser]';
export const loginAction = createAction(`${currentUserDomain} LoginAction` , props<{user: IUser}>());
export const logoutAction = createAction(`${currentUserDomain} LogoutAction`);