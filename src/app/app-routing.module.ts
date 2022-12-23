import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/pages/home/home.component';
import { PageNotFoundComponent } from './feature/pages/page-not-found/page-not-found.component';
import { SearchDetailsPageComponent } from './feature/pages/search-details-page/search-details-page.component';
import { SearchPageComponent } from './feature/pages/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'strollers',
    loadChildren: () => import('./feature/strollers/strollers.module').then(module => module.StrollersModule)
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'search/result',
    component: SearchDetailsPageComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./feature/admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
