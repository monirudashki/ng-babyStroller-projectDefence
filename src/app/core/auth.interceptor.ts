import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IUser } from './interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if(event instanceof HttpResponse) {
          if(event.url?.endsWith('login') || event.url?.endsWith('register')) {
            console.log('login or register happaned');
            const newUser: IUser = event.body as IUser;
            this.authService.handleLogin(newUser);
          } else if (event.url?.endsWith('logout')) {
            this.authService.handleLogout();
          }
        }
      })
    )
  }
}
