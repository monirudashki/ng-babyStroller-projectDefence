import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginActive: boolean = false;
  errorMessage: string = '';
  
  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('' , [Validators.required , Validators.pattern(/^.{6,}@gmail\.(bg|com)$/)]), 
    password: new FormControl('', [Validators.required , Validators.minLength(4)])
  });

  constructor(private formBuilder: FormBuilder , private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginHandler(): void {
    this.isLoginActive = true;
    this.errorMessage = '';
    this.authService.login$(this.loginFormGroup.value).subscribe({
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
}
