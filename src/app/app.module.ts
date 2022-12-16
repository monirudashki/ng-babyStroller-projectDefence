import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { IRootState } from './+store';
import { currentUserReducer } from './+store/reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { PagesModule } from './feature/pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    PagesModule,
    StoreModule.forRoot<IRootState>({
      currentUser: currentUserReducer
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => {       
          return () => authService.authenticate(); 
      },
      deps: [AuthService],
      multi: true
    },
    [Title]
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent]
})
export class AppModule { }
