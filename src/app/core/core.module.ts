import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { StrollersService } from './strollers.service';
import { CommentService } from './comment.service';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { 
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
     ngModule: CoreModule,
     providers: [
      StrollersService,
      CommentService,
       {
         provide: HTTP_INTERCEPTORS,
         multi: true,
         useClass: AuthInterceptor
       }
     ]
    }
 }
}
