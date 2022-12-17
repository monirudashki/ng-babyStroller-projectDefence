import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IBabyStroller } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  title: string = 'Catalog Page';

  page: number = 1;
  limit: number = 3;
  lastPage!: number;
  strollersCatalog!: IBabyStroller[];

  constructor(private strollersService: StrollersService , private titleService: Title) { }

  ngOnInit(): void {

    this.titleService.setTitle(this.title);

    this.strollersService.getStrollersLength$().subscribe(
      (strollersLength) => {
         this.lastPage = Math.ceil(strollersLength / this.limit);
      }
    )

    this.strollersService.loadStrollers$(this.page).subscribe(
      (strollersList) => {
        this.strollersCatalog = strollersList;
      } 
    )
  }

  pageMinusHandler() {
    if(this.page > 1) {
      this.page--;
    }

    this.strollersService.loadStrollers$(this.page).subscribe(
      (strollersList) => {
        this.strollersCatalog = strollersList;
      } 
    );
  }

  pagePlusHandler() {
    if(this.page < this.lastPage) {
      this.page++;
    }

    this.strollersService.loadStrollers$(this.page).subscribe(
      (strollersList) => {
        this.strollersCatalog = strollersList;
      
      } 
    );
  }

}
