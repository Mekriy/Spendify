import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Login} from "../../shared/interfaces/login";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  providers: [AuthService]
})
export class LoginPageComponent {
  emailPattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern:string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'

  constructor(private readonly authService: AuthService) {}


  loginForm = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('',
      [Validators.required, Validators.pattern(this.passwordPattern)
      ])
  });
  onSubmit() {
    let loginObj: Login = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }
    this.authService.login(loginObj)
  }
}
