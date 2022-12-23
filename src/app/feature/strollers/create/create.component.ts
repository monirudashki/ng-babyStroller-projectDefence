import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  isCreateActive: boolean = false;
  currentUser$: Observable<IUser> = this.authService.currentUser$;
  currentUser: IUser = undefined as unknown as IUser;

  title: string = 'Add stroller Page';

  errorMessage: string = '';
   
  createFormGroup: FormGroup = this.formBuilder.group({
    babyStrollerBrand: new FormControl('' , [Validators.required , Validators.minLength(3)]),
    imageUrl: new FormControl('' , [Validators.required , Validators.pattern(/^https?:\/\/.+/)]),
    price: new FormControl('' , [Validators.required , Validators.min(1)]),
    year: new FormControl('' , [Validators.required]),
    condition: new FormControl('' , [Validators.required]),
  })

  constructor(
     private formBuilder: FormBuilder ,
     private routes: Router , 
     private strollerService: StrollersService ,
     private router: Router ,
     private titleService: Title,
     private authService: AuthService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }

  createHandle(): void {
    this.isCreateActive = true;
    this.errorMessage = '';
    this.strollerService.createStroller$(this.createFormGroup.value).subscribe({
       next: () => {
        this.isCreateActive = false;
        this.router.navigate([`strollers/userStrollers/${this.currentUser._id}`]);
       },
       complete: () => console.log('complete create stroller'),
       error: (err) => {
         this.isCreateActive = false;
         this.errorMessage = err.error.message;
       }
    });
  }
  
  cancelHandle(): void {
    this.routes.navigate(['/home']);
  }
}
