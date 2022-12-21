import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IBabyStroller } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  
  title: string = 'Search Page'
  searchingBY = 'babyStrollerBrand';
  isSearchActive: boolean = false;

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

  constructor(
    private formBuilder: FormBuilder , 
    private strollersService: StrollersService , 
    private titleService: Title,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  searchByHandler(value: any): void {
     this.searchingBY = value;
  }

  searchByBrandHandler(): void {
    const searchBy = 'babyStrollerBrand';
    const search = this.searchFormGroup.controls['search'].value;
    this.router.navigate(['/search/result'], {
      queryParams: {
        searchby: searchBy,
        search: search,
        page: 1
      },
      queryParamsHandling: 'merge',
    });
  }

  searchByConditionHandler():void{
    const searchBy = 'condition';
    const search = this.searchByConditionFormGroup.controls['searchByCondition'].value;
    console.log(search);
    this.router.navigate(['/search/result'], {
      queryParams: {
        searchby: searchBy,
        search: search,
        page: 1
      },
      queryParamsHandling: 'merge',
    });
  }

  searchByPriceHandler(): void {
    const searchBy = 'price';
    const search = `${this.searchByPriceFormGroup.controls['min'].value}-${this.searchByPriceFormGroup.controls['max'].value}`;
    this.router.navigate(['/search/result'], {
      queryParams: {
        searchby: searchBy,
        search: search,
        page: 1
      },
      queryParamsHandling: 'merge',
    });
  } 
}
