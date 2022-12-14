import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IBabyStroller, IUser } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';
import { SubscriptionsContainer } from 'src/app/core/subscription.container';

@Component({
  selector: 'app-user-strollers-page',
  templateUrl: './user-strollers-page.component.html',
  styleUrls: ['./user-strollers-page.component.css']
})
export class UserStrollersPageComponent implements OnInit , OnDestroy {

  title: string = 'User Strollers Page';

  subs = new SubscriptionsContainer();

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  currentUser: IUser = undefined as unknown as IUser;
  
  page: number = 1;
  limit: number = 3;
  lastPage!: number;

  isActive: boolean = true;
  strollersCatalog!: IBabyStroller[];
  activeCount!: number;

  isHolding: boolean = false;
  strollersHolding!: IBabyStroller[];
  holdingCount!: number;

  isModerated: boolean = false;
  strollersModerated!: IBabyStroller[];
  moderatedCount!: number;

  userId!: string;
  username!: string;
  isOwner: boolean = false;

  constructor(
    private strollersService: StrollersService , 
    private activateRoute: ActivatedRoute ,
    private authService: AuthService,
    private titleService: Title,
    private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
   
    this.subs.add = this.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });

    const userId = this.activateRoute.snapshot.params['userId'];
    if(this.activateRoute.snapshot.queryParams['page']) {
      this.page = this.activateRoute.snapshot.queryParams['page'];
    }

    this.userId = userId;

    if(userId === this.currentUser._id) {
      this.isOwner = true;
    }

    this.subs.add = this.authService.loadUserProfileById$(userId).subscribe({
      next: (user) => {
          this.username = user.username;
      },
      error: (err) => {
        this.router.navigate(['/page-not-found']);
      }
    })

    this.subs.add = this.strollersService.getUserStrollersLength$(userId).subscribe(
      (strollersLength) => {
         this.lastPage = Math.ceil(strollersLength / this.limit);
         this.activeCount = strollersLength;
         if(this.lastPage < 1) {
           this.lastPage = 1;
         }
         if(!(this.page <= this.lastPage)) {
          this.router.navigate(['not-found-page'])
        }
      }
    )

    this.subs.add = this.strollersService.loadUserStrollers$(userId , this.page).subscribe({
      next: (strollers) => {
        console.log(strollers);
        if(!strollers) {
          this.router.navigate(['/not-found-page']);
        }
        this.strollersCatalog = strollers;
        this.router.navigate([], {
          relativeTo: this.activateRoute,
          queryParams: {
            page: this.page
          },
          queryParamsHandling: 'merge',
        });
      }, 
      error: (err) => {
        this.router.navigate(['/not-found-page']);
      }
    });
    
    if(this.isOwner) {
      this.subs.add = this.strollersService.loadUserStrollersHolding$(userId).subscribe({
        next: (strollers) => {
          this.holdingCount = strollers.length;
          this.strollersHolding = strollers;
        }
      });
  
      this.subs.add = this.strollersService.loadUserStrollersModerated$(userId).subscribe({
        next: (strollers) => {
          this.moderatedCount = strollers.length;
          this.strollersModerated = strollers;
        }
      });
    }
  }

  pageMinusHandler() {
    if(this.page > 1) {
      this.page--;
    }

    this.subs.add = this.strollersService.loadUserStrollers$(this.userId , this.page).subscribe(
      (strollersList) => {
        this.strollersCatalog = strollersList;
        this.router.navigate([], {
          relativeTo: this.activateRoute,
          queryParams: {
            page: this.page
          },
          queryParamsHandling: 'merge',
        });
      } 
    );
  }

  pagePlusHandler() {
    if(this.page < this.lastPage) {
      this.page++;
    }

    this.subs.add = this.strollersService.loadUserStrollers$(this.userId , this.page).subscribe(
      (strollersList) => {
        this.strollersCatalog = strollersList;
        this.router.navigate([], {
          relativeTo: this.activateRoute,
          queryParams: {
            page: this.page
          },
          queryParamsHandling: 'merge',
        });
      } 
    );
  }
  
  activeOn() {
    this.isActive = true;
    this.isHolding = false;
    this.isModerated = false;
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {
        page: '1'
      },
      queryParamsHandling: 'merge',
    });
  }

  holdingOn() {
    this.isActive = false;
    this.isHolding = true;
    this.isModerated = false;
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {},
    });
  }

  moderatedOn() {
    this.isActive = false;
    this.isHolding = false;
    this.isModerated = true;
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {},
    });
  }

  ngOnDestroy(): void {
    this.subs.dispose();
  }
}
