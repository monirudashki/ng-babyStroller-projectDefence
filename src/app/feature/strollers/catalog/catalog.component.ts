import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IBabyStroller } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';
import { SubscriptionsContainer } from 'src/app/core/subscription.container';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {

  title: string = 'Catalog Page';

  subs = new SubscriptionsContainer();

  page: number = this.activateRoute.snapshot.queryParams['page'];
  limit: number = 3;
  lastPage!: number;
  strollersCatalog!: IBabyStroller[];

  constructor(
    private strollersService: StrollersService,
    private titleService: Title,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.subs.add = this.strollersService.getStrollersLength$().subscribe(
      (strollersLength) => {
        this.lastPage = Math.ceil(strollersLength / this.limit);
        if(!(this.page <= this.lastPage)) {
          this.router.navigate(['not-found-page'])
        }
      }
    )

    this.subs.add = this.strollersService.loadStrollers$(this.page).subscribe(
      (strollersList) => {
        this.strollersCatalog = strollersList;
      }
    )
  }

  pageMinusHandler() {
    if (this.page > 1) {
      this.page--;
    }

    this.subs.add = this.strollersService.loadStrollers$(this.page).subscribe(
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
    if (this.page < this.lastPage) {
      this.page++;
    }
    this.subs.add = this.strollersService.loadStrollers$(this.page).subscribe(
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