import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggingOut: boolean = false;

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLogged$: Observable<boolean> = this.authService.isLogged$

  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit(): void {
  }
  
  logoutHandler(): void {
    if(this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;

    this.authService.logout$().subscribe({
      next: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/home'])
      },
      complete: () => console.log('logout completed'),
      error: () => this.isLoggingOut = false
    })
  }
}
