import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { IBabyStroller } from 'src/app/core/interfaces/babyStroller';
import { StrollersService } from 'src/app/core/strollers.service';
import { SubscriptionsContainer } from 'src/app/core/subscription.container';

@Component({
  selector: 'app-search-details-page',
  templateUrl: './search-details-page.component.html',
  styleUrls: ['./search-details-page.component.css']
})
export class SearchDetailsPageComponent implements OnInit , OnDestroy {

  title: string = 'Search Result';

  subs = new SubscriptionsContainer();

  page: number = this.activateRoute.snapshot.queryParams['page'];
  searchBy: string = this.activateRoute.snapshot.queryParams['searchby'];
  search: string = this.activateRoute.snapshot.queryParams['search'];
  limit: number = 3;
  skip: number = (this.page - 1) * this.limit;
  lastPage!: number;

  strollersResult!: IBabyStroller[];

  constructor(
    private strollersService: StrollersService , 
    private titleService: Title,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.titleService.setTitle(this.title);

      this.subs.add = this.strollersService.getResultBySearchLength$(this.searchBy , this.search).subscribe({
        next: (length) => {
          this.lastPage = Math.ceil(length / this.limit);
        }
      })

      this.subs.add = this.strollersService.getResultBySearch$(this.searchBy , this.search , this.page).subscribe({
      next: (result) => {
        this.strollersResult = result;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  pageMinusHandler() {
    if(this.page > 1) {
      this.page--;
    }
    
    this.subs.add = this.strollersService.getResultBySearch$(this.searchBy , this.search , this.page).subscribe({
      next: (result) => {
        this.strollersResult = result;
        this.router.navigate([], {
          relativeTo: this.activateRoute,
          queryParams: {
            searchby: this.searchBy,
            search: this.search,
            page: this.page
          },
          queryParamsHandling: 'merge',
        });
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  pagePlusHandler() {
    if(this.page < this.lastPage) {
      this.page++;
    }

    this.subs.add = this.strollersService.getResultBySearch$(this.searchBy , this.search , this.page).subscribe({
      next: (result) => {
        this.strollersResult = result;
        this.router.navigate([], {
          relativeTo: this.activateRoute,
          queryParams: {
            searchby: this.searchBy,
            search: this.search,
            page: this.page
          },
          queryParamsHandling: 'merge',
        });
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.dispose();
  }
}
