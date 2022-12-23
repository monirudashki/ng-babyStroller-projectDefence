import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SubscriptionsContainer } from 'src/app/core/subscription.container';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {
  
  title: string = 'Login Page';

  subs = new SubscriptionsContainer();

  isLoginActive: boolean = false;
  errorMessage: string = '';
  
  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('' , [Validators.required , Validators.pattern(/^.{6,}@gmail\.(bg|com)$/)]), 
    password: new FormControl('', [Validators.required , Validators.minLength(4)])
  });

  constructor(private formBuilder: FormBuilder , private authService: AuthService, private router: Router , private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  loginHandler(): void {
    this.isLoginActive = true;
    this.errorMessage = '';
    this.subs.add = this.authService.login$(this.loginFormGroup.value).subscribe({
        next: () => {
          this.isLoginActive = false;
          this.router.navigate(['/home'])
        },
        complete: () => console.log('login complete'),
        error: (error) => {
          this.isLoginActive = false;
          this.errorMessage = error.error.message
        } 
    })
  }

  ngOnDestroy(): void {
    this.subs.dispose();
  }
}
