import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-catalog-edit-page',
  templateUrl: './catalog-edit-page.component.html',
  styleUrls: ['./catalog-edit-page.component.css']
})
export class CatalogEditPageComponent implements OnInit {

  title: string = 'Edit Page';

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

    this.strollersService.loadStrollerById$(strollerId).subscribe((stroller) => {
       this.editFormGroup.patchValue({
        babyStrollerBrand: stroller.babyStrollerBrand,
        imageUrl: stroller.imageUrl,
        price: stroller.price,
        year: stroller.year,
        condition: stroller.condition
       })
    })
  }
  
  editHandle(): void {
    this.errorMessage = '';
    const strollerId = this.activateRoute.snapshot.params['id'];

    this.strollersService.updateStroller$(this.editFormGroup.value , strollerId).subscribe({
      next: () => this.router.navigate([`/strollers/${strollerId}`]),
      complete: () => console.log('complete edit stroller'),
      error: (err) => {
        this.errorMessage = err.error.message;
      }
   });
  }

  cancelHandle(): void {
    this.router.navigate(['/home']);
  }

}
