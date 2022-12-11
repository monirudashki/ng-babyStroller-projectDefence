import { createReducer, on } from "@ngrx/store";
import { IUser } from "../core/interfaces";
import { loginAction, logoutAction } from "./actions";

export const currentUserReducer = createReducer<IUser>(
    undefined as unknown as IUser,
    on(loginAction , (_ , action) => action.user),
    on(logoutAction , () => undefined as unknown as IUser)
)