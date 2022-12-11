import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
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
        canActivate: [AuthGuard],
        component: CreateComponent
    },
    {
        path: 'userStrollers/:userId',
        component: UserStrollersPageComponent
    },
    {
        path: ':id',
        component: CatalogDetailsPageComponent
    },
    {
        path: ':id/edit',
        component: CatalogEditPageComponent
    }
]

export const strollersRouterModule = RouterModule.forChild(routes);