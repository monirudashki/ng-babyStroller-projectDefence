import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminRouterModule } from './admin-router.module';
import { RouterModule } from '@angular/router';
import { AdminCatalogPageComponent } from './admin-catalog-page/admin-catalog-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StrollersModule } from '../strollers/strollers.module';

@NgModule({
  declarations: [
    AdminCatalogPageComponent
  ],
  imports: [
    CommonModule,
    adminRouterModule,
    RouterModule,
    MatProgressSpinnerModule,
  ]
})
export class AdminModule { }
