import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRootState } from './+store';
import { loginAction, logoutAction } from './+store/actions';
import { IUser } from './core/interfaces';
import { ICreateUserDto } from './core/interfaces/createUserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUser$ = this.store.select(globalState => globalState.currentUser);
  isLogged$ = this.currentUser$.pipe(
    tap((user) => console.log(user)),
    map((user) => !!user)
  );

  constructor(private httpClient: HttpClient , private store: Store<IRootState>) { }

  register$(userData: ICreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${environment.apiUrl}/register`, userData , { withCredentials: true }).pipe(
        tap(user => console.log(user))
      );
  }

  login$(userData: {email: string , password: string}): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${environment.apiUrl}/login`, userData , { withCredentials: true })
  }
  
  logout$(): Observable<void> {
     return this.httpClient.post<void>(`${environment.apiUrl}/logout`, {} , { withCredentials: true })
  }

  handleLogin(newUser: IUser) {
    this.store.dispatch(loginAction({user: newUser}));
  }

  handleLogout() {
    this.store.dispatch(logoutAction());
  }

  hasUser$(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.apiUrl}/hasUser` , {withCredentials: true})
  }

  authenticate(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true }).pipe(
        tap((currentProfile) => this.handleLogin(currentProfile)),
        catchError((err) => {
          return EMPTY
        })
    )
  } 

  getUserProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true });
  }

  editProfileInfo$(userData: ICreateUserDto): Observable<IUser> {
    return this.httpClient.put<IUser>(`${environment.apiUrl}/users/profile`, userData, { withCredentials: true });
  }
  
}

