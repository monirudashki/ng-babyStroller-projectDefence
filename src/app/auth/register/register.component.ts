import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    phone: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder , private authService: AuthService , private router: Router) { }

  ngOnInit(): void {
  }

  handleRegistration(): void {
    const { username, email, passwords, phone} =
      this.registerFormGroup.value;

    const body: ICreateUserDto = {
      username: username,
      email: email,
      password: passwords.password,
    };

    if (phone) {
      body.phone = phone;
    }

    this.authService.register$(body).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

}
