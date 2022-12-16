import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ICreateUserDto } from 'src/app/core/interfaces/createUserDto';
import { passwordMatch } from '../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   title: string = 'Register Page';

  errorMessage: string = '';
  isRegistrationActive: boolean = false;
  
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(4)],);
  
  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl('' , [Validators.required, Validators.minLength(3)]),
    email: new FormControl('' , [Validators.required , Validators.pattern(/^.{6,}@gmail\.(bg|com)$/)]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePass: new FormControl('', [Validators.required, passwordMatch(this.passwordControl)])
    }),
    tel: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder , private authService: AuthService , private router: Router , private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  handleRegistration(): void {
    this.isRegistrationActive = true;
    const { username, email, passwords, tel} =
      this.registerFormGroup.value;

    const body: ICreateUserDto = {
      username: username,
      email: email,
      password: passwords.password,
    };

    if (tel) {
      body.tel = tel;
    }

    this.authService.register$(body).subscribe({
      next: () => {
        this.isRegistrationActive = false;
        this.errorMessage = '';
        this.router.navigate(['/home']);
      },
      complete: () => console.log('registration complete'),
      error: (error) => {
        this.isRegistrationActive = false;
        this.errorMessage = error.error.message
      } 
    });
  }

}
