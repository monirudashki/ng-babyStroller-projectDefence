import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  errorMessage: string = '';
   
  createFormGroup: FormGroup = this.formBuilder.group({
    babyStrollerBrand: new FormControl('' , [Validators.required , Validators.minLength(3)]),
    imageUrl: new FormControl('' , [Validators.required , Validators.pattern(/^https?:\/\/.+/)]),
    price: new FormControl('' , [Validators.required , Validators.min(1)]),
    year: new FormControl('' , [Validators.required]),
    condition: new FormControl('' , [Validators.required]),
  })

  constructor(private formBuilder: FormBuilder , private routes: Router , private strollerService: StrollersService , private router: Router) { }

  ngOnInit(): void {
  }

  createHandle(): void {
    this.errorMessage = '';
    this.strollerService.createStroller$(this.createFormGroup.value).subscribe({
       next: () => this.router.navigate(['/strollers']),
       complete: () => console.log('complete create stroller'),
       error: (err) => {
         this.errorMessage = err.error.message;
       }
    });
  }
  
  cancelHandle(): void {
    this.routes.navigate(['/home']);
  }
}
