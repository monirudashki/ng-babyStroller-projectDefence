import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { StrollersModule } from '../strollers/strollers.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HomeComponent,
        PageNotFoundComponent,
        SearchPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        StrollersModule,
        ReactiveFormsModule
    ]
})
export class PagesModule { }
