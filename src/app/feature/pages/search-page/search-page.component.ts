import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { IBabyStroller } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  
  title: string = 'Search Page'
  searchingBY: string = 'babyStrollerBrand';
  isSearchActive: boolean = false;

  page: number = 1;
  limit: number = 3;
  skip: number = (this.page - 1) * this.limit;
  lastPage!: number;

  strollersResult!: IBabyStroller[];

  searchFormGroup: FormGroup = this.formBuilder.group({
    searchBy: new FormControl(''),
    search: new FormControl('')
  });

  searchByConditionFormGroup: FormGroup = this.formBuilder.group({
    searchByCondition: new FormControl('')
  });

  searchByPriceFormGroup: FormGroup = this.formBuilder.group({
    min: new FormControl(0),
    max: new FormControl(0)
  })

  constructor(private formBuilder: FormBuilder , private strollersService: StrollersService , private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  searchByHandler(value: any): void {
     this.searchingBY = value;
  }

  searchByBrandHandler(): void {
    this.isSearchActive = true;
    this.page = 1;
    this.skip = (this.page - 1) * this.limit; 
    const searchBy = 'babyStrollerBrand';
    const search = this.searchFormGroup.controls['search'].value;

    this.strollersService.getResultBySearch$(searchBy , search).subscribe({
      next: (result) => {
        this.isSearchActive = false;
        this.strollersResult = result;
        this.lastPage = Math.ceil(this.strollersResult.length / this.limit);
      },
      error: (err) => {
        this.isSearchActive = false;
        console.error(err);
      }
    })
  }

  searchByConditionHandler():void{
    this.isSearchActive = true;
    this.page = 1;
    this.skip = (this.page - 1) * this.limit;
    const searchBy = 'condition';
    const search = this.searchByConditionFormGroup.controls['searchByCondition'].value;

    this.strollersService.getResultBySearch$(searchBy , search).subscribe({
      next: (result) => {
        this.isSearchActive = false;
        this.strollersResult = result;
        this.lastPage = Math.ceil(this.strollersResult.length / this.limit);
      },
      error: (err) => {
        this.isSearchActive = false;
        console.error(err);
      }
    })
  }

  searchByPriceHandler(): void {
    this.isSearchActive = true;

    this.page = 1;
    this.skip = (this.page - 1) * this.limit;
    const searchBy = 'price';
    const search = `${this.searchByPriceFormGroup.controls['min'].value}-${this.searchByPriceFormGroup.controls['max'].value}`;

    this.strollersService.getResultBySearch$(searchBy , search).subscribe({
      next: (result) => {
        this.isSearchActive = false;
        this.strollersResult = result;
        this.lastPage = Math.ceil(this.strollersResult.length / this.limit);
      },
      error: (err) => {
        this.isSearchActive = false;
        console.error(err);
      }
    })
  }

  pageMinusHandler() {
    if(this.page > 1) {
      this.page--;
      this.skip = (this.page - 1) * this.limit;
    }
  }

  pagePlusHandler() {
    if(this.page < this.lastPage) {
      this.page++;
      this.skip = (this.page - 1) * this.limit;
    }
  } 
}
