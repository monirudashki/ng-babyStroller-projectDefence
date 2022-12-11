import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authRoutingModule } from './auth-Routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    authRoutingModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class AuthModule { }
