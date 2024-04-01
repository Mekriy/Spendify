import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordsMatchValidator} from "../../../shared/Validators/form-validator";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  emailPattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern:string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('',
      [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('',
      [Validators.required, Validators.pattern(this.passwordPattern), passwordsMatchValidator("confirmPassword", false)]),
    confirmPassword: new FormControl('', [Validators.required, passwordsMatchValidator("Password", true)])
  });
  onSubmit() {
    console.log(this.registerForm.value.email, this.registerForm.value.password)
  }
}
