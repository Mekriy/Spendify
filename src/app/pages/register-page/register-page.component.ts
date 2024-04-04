import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordsMatchValidator} from "../../shared/validators/form-validator";
import {AuthService} from "../../shared/services/auth.service";
import {Register} from "../../shared/interfaces/register";
import {success} from "concurrently/dist/src/defaults";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  providers: [ConfirmationService, MessageService, AuthService]
})
export class RegisterPageComponent {
  emailPattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern:string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'

  firstName!: string;
  lastName!: string;
  constructor(
    private readonly authService: AuthService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('',
      [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('',
      [Validators.required, Validators.pattern(this.passwordPattern)]),
    confirmPassword: new FormControl('', [Validators.required, passwordsMatchValidator("Password", true)])
  });

  myresult!: string;

  onSubmit() {
    console.log(this.registerForm.value.email, this.registerForm.value.password)
    let registerObj: Register = {
      username: this.registerForm.value.email!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    }
    this.firstName = this.registerForm.value.firstName!;
    this.lastName = this.registerForm.value.lastName!;

    this.authService.register(registerObj);
    this.authService.result
      .subscribe((res: any) =>{
        this.myresult = res;
        console.log(this.myresult)
        this.myresult? this.emailSent() : this.emailNotSent()
      })
  }
  emailSent() {
    this.confirmationService.confirm({
      message: 'Message on your email has been sent! Please confirm your email!',
      header: 'Email Verification',
      icon: 'pi pi-envelope',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Please', detail: 'Confirm your email' });
      }
    })
  }

  private emailNotSent() {
    this.confirmationService.confirm({
      message: 'Error occurred while sending email! Try again later',
      header: 'Email Verification',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Try again' });
      }
    })
  }
}
