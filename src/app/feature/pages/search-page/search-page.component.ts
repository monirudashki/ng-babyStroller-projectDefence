import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IBabyStroller } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  
  searchingBY: string = 'babyStrollerBrand';

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

  constructor(private formBuilder: FormBuilder , private strollersService: StrollersService) { }

  ngOnInit(): void {
  }

  searchByHandler(value: any): void {
     this.searchingBY = value;
  }

  searchByBrandHandler(): void {
    const searchBy = 'babyStrollerBrand';
    const search = this.searchFormGroup.controls['search'].value;

    this.strollersService.getResultBySearch$(searchBy , search).subscribe({
      next: (result) => {
        this.strollersResult = result
        console.log(this.strollersResult);
      }
    })
  }

  searchByConditionHandler():void{
    const searchBy = 'condition';
    const search = this.searchByConditionFormGroup.controls['searchByCondition'].value;

    this.strollersService.getResultBySearch$(searchBy , search).subscribe({
      next: (result) => {
        this.strollersResult = result
        console.log(this.strollersResult);
      }
    })
  }

  searchByPriceHandler(): void {
    const searchBy = 'price';
    const search = `${this.searchByPriceFormGroup.controls['min'].value}-${this.searchByPriceFormGroup.controls['max'].value}`;

    this.strollersService.getResultBySearch$(searchBy , search).subscribe({
      next: (result) => {
        this.strollersResult = result
        console.log(this.strollersResult);
      }
    })
  }
}
