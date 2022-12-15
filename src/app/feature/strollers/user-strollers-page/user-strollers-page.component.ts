import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IBabyStroller } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-user-strollers-page',
  templateUrl: './user-strollers-page.component.html',
  styleUrls: ['./user-strollers-page.component.css']
})
export class UserStrollersPageComponent implements OnInit {

  page: number = 1;
  limit: number = 3;
  lastPage!: number;
  strollersCatalog!: IBabyStroller[];
  userId!: string;
  username!: string;

  constructor(private strollersService: StrollersService , private activateRoute: ActivatedRoute , private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.activateRoute.snapshot.params['userId'];

    this.userId = userId;

    this.authService.loadUserProfileById$(userId).subscribe({
      next: (user) => {
          this.username = user.username;
      }
    })

    this.strollersService.getUserStrollersLength$(userId).subscribe(
      (strollersLength) => {
         this.lastPage = Math.ceil(strollersLength / this.limit);
      }
    )

    this.strollersService.loadUserStrollers$(userId , this.page).subscribe({
      next: (strollers) => {
        this.strollersCatalog = strollers;
      }
    })
  }

  pageMinusHandler() {
    if(this.page > 1) {
      this.page--;
    }

    this.strollersService.loadUserStrollers$(this.userId , this.page).subscribe(
      (strollersList) => {
        this.strollersCatalog = strollersList;
      } 
    );
  }

  pagePlusHandler() {
    if(this.page < this.lastPage) {
      this.page++;
    }

    this.strollersService.loadUserStrollers$(this.userId , this.page).subscribe(
      (strollersList) => {
        this.strollersCatalog = strollersList;
      } 
    );
  }
  
}
