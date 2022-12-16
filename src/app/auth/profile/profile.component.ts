import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IBabyStroller, IUser } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title: string = 'Profile Page';

  errorMessage: string = '';
  isUpdating: boolean = false;
  currentUser$: Observable<IUser> = this.authService.currentUser$;
  currentUser: IUser = undefined as unknown as IUser;
  isEditMode: boolean = false;
  userCatalog!: IBabyStroller[];

  profileEditFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl('',[Validators.required, Validators.minLength(5)],
      []
    ),
    email: new FormControl(
      '',
      [Validators.required, Validators.pattern(/^.{6,}@gmail\.(bg|com)$/)],
      []
    ),
    tel: new FormControl(''),
  })

  constructor(private authService: AuthService , private router: Router , private formBuilder: FormBuilder , private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }

  editHandler(): void {
    this.isEditMode = true;
    
    this.profileEditFormGroup.patchValue({
      email: this.currentUser.email,
      username: this.currentUser.username,
      tel: this.currentUser.tel
    })
  }

  updateProfile(): void {
    this.isUpdating = true;
    this.errorMessage = '';
    this.authService.editProfileInfo$(this.profileEditFormGroup.value).subscribe({
      next: (user) => { 
        this.isUpdating = false;
        this.authService.handleLogin(user);
        this.isEditMode = false;
        this.router.navigate(['/auth/profile']);
      },
      complete: () => console.log('edit profile completed'),
      error: (error) => {
        this.isUpdating = false;
        this.errorMessage = 'Email has been already registered!';
      }  
    });
  }

  cancelHandler(): void {
    this.isEditMode = false;
  }
}

