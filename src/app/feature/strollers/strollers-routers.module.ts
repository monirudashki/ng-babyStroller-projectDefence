import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { PageNotFoundComponent } from "../pages/page-not-found/page-not-found.component";
import { CatalogDetailsPageComponent } from "./catalog-details-page/catalog-details-page.component";
import { CatalogEditPageComponent } from "./catalog-edit-page/catalog-edit-page.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { CreateComponent } from "./create/create.component";
import { UserStrollersPageComponent } from "./user-strollers-page/user-strollers-page.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: CatalogComponent
    },
    {
        path: 'create',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: CreateComponent
    },
    {
        path: 'userStrollers/:userId',
        canActivate: [AuthGuard],
        component: UserStrollersPageComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: CatalogDetailsPageComponent
    },
    {
        path: ':id/edit',
        canActivate: [AuthGuard],
        component: CatalogEditPageComponent
    }
]

export const strollersRouterModule = RouterModule.forChild(routes);