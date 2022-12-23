import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "src/app/core/guards/admin.guard";
import { AdminCatalogPageComponent } from "./admin-catalog-page/admin-catalog-page.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [AdminGuard],
        component: AdminCatalogPageComponent
    },
]

export const adminRouterModule = RouterModule.forChild(routes);