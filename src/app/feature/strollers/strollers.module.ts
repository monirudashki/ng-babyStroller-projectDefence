import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { strollersRouterModule } from './strollers-routers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { CatalogDetailsPageComponent } from './catalog-details-page/catalog-details-page.component';
import { CatalogEditPageComponent } from './catalog-edit-page/catalog-edit-page.component';
import { CommentPageItemComponent } from './comment-page-item/comment-page-item.component';
import { UserStrollersPageComponent } from './user-strollers-page/user-strollers-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    CatalogComponent,
    CreateComponent,
    CatalogItemComponent,
    CatalogDetailsPageComponent,
    CatalogEditPageComponent,
    CommentPageItemComponent,
    UserStrollersPageComponent,
  ],
  imports: [
    CommonModule,
    strollersRouterModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ], 
  exports: [
    CatalogItemComponent
  ]
})
export class StrollersModule { }
