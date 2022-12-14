import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { GuestGuard } from "../core/guards/guest.guard";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: 'register',
        canActivate: [GuestGuard],
        component: RegisterComponent
    },
    {
        path: 'login',
        canActivate: [GuestGuard],
        component: LoginComponent
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
    }
]

export const authRoutingModule = RouterModule.forChild(routes);