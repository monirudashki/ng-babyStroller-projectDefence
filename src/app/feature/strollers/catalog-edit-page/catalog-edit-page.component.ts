import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';
import { SubscriptionsContainer } from 'src/app/core/subscription.container';

@Component({
  selector: 'app-catalog-edit-page',
  templateUrl: './catalog-edit-page.component.html',
  styleUrls: ['./catalog-edit-page.component.css']
})
export class CatalogEditPageComponent implements OnInit , OnDestroy {
  
  title: string = 'Edit Page';

  subs = new SubscriptionsContainer();

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  currentUser: IUser = undefined as unknown as IUser;
  
  isEditActive: boolean = false;

  errorMessage: string = '';
   
  editFormGroup: FormGroup = this.formBuilder.group({
    babyStrollerBrand: new FormControl('' , [Validators.required , Validators.minLength(3)]),
    imageUrl: new FormControl('' , [Validators.required , Validators.pattern(/^https?:\/\/.+/)]),
    price: new FormControl('' , [Validators.required , Validators.min(1)]),
    year: new FormControl('' , [Validators.required]),
    condition: new FormControl('' , [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private strollersService: StrollersService,
    private activateRoute: ActivatedRoute,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    const strollerId = this.activateRoute.snapshot.params['id'];

    this.subs.add = this.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });

    this.subs.add = this.strollersService.loadStrollerById$(strollerId).subscribe({
      next: (stroller) => {
      if(!stroller) {
        this.router.navigate(['/not-found-page']);
      }
      this.editFormGroup.patchValue({
      babyStrollerBrand: stroller.babyStrollerBrand,
      imageUrl: stroller.imageUrl,
      price: stroller.price,
      year: stroller.year,
      condition: stroller.condition
      })},
      error: (err) => {
        this.router.navigate(['/not-found-page']);
      }})
  }
  
  editHandle(): void {
    this.isEditActive = true;
    this.errorMessage = '';
    const strollerId = this.activateRoute.snapshot.params['id'];

    this.subs.add = this.strollersService.updateStroller$(this.editFormGroup.value , strollerId).subscribe({
      next: () => {
        this.isEditActive = false;
        this.router.navigate([`strollers/userStrollers/${this.currentUser._id}`]);
      } ,
      complete: () => console.log('complete edit stroller'),
      error: (err) => {
        this.isEditActive = false;
        this.errorMessage = err.error.message;
      }
   });
  }

  cancelHandle(): void {
    this.router.navigate(['/home']);
  }
  
  ngOnDestroy(): void {
    this.subs.dispose();
  }
}
