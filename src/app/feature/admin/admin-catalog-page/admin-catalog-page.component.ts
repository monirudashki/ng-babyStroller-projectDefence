import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IBabyStroller, IUser } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';
import { Store } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { AdminService } from 'src/app/core/admin.service';
import { SubscriptionsContainer } from 'src/app/core/subscription.container';

@Component({
  selector: 'app-admin-catalog-page',
  templateUrl: './admin-catalog-page.component.html',
  styleUrls: ['./admin-catalog-page.component.css']
})
export class AdminCatalogPageComponent implements OnInit , OnDestroy{

  title: string = "Admin Page";

  subs = new SubscriptionsContainer();

  page: number = this.activateRoute.snapshot.queryParams['page'];
  limit: number = 3;
  lastPage!: number;

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  currentUser: IUser = undefined as unknown as IUser;
  adminId!: string
  
  strollersCatalog!: IBabyStroller[];

  constructor( private strollersService: StrollersService , 
    private titleService: Title,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.subs.add = this.currentUser$.subscribe({
      next: (user) => {
        if(user) {
          this.currentUser = user;
          this.adminId = user._id;
          this.lastPage = Math.ceil(user.babyStrollers.length / this.limit);
        }
      }
    });

    this.subs.add = this.adminService.loadStrollersForAdmin$(this.page).subscribe({
      next: (strollers) => {
        this.strollersCatalog = strollers;
      }
    })
  }
  
  moderateStrollerHandle(strollerId: string): void {
    this.subs.add = this.adminService.adminModerateStroller$(strollerId).subscribe({
      next: (stroller) => {
        const index = this.strollersCatalog.indexOf(stroller);
        this.strollersCatalog.splice(index , 1);
      },
      complete: () => console.log('complete moderate stroller by admin'),
      error: (err) => {
        console.error(err);
      }
    });
  }

  approveStrollerHandle(strollerId: string): void {
    this.subs.add = this.adminService.adminApproveStroller$(strollerId).subscribe({
      next: (stroller) => {
        const index = this.strollersCatalog.indexOf(stroller);
        this.strollersCatalog.splice(index , 1);
      },
      complete: () => console.log('complete approve stroller by admin'),
      error: (err) => {
        console.error(err);
      }
    });
  }

  pageMinusHandler() {
    if(this.page > 1) {
      this.page--;
    }

    this.subs.add = this.adminService.loadStrollersForAdmin$(this.page).subscribe(
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
    this.subs.add = this.adminService.loadStrollersForAdmin$(this.page).subscribe(
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

    ngOnDestroy(): void {
      this.subs.dispose();
    }
}
