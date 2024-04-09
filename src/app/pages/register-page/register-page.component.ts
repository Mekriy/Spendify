import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordsMatchValidator} from "../../shared/validators/form-validator";
import {AuthService} from "../../shared/services/auth.service";
import {Register} from "../../shared/interfaces/register";
import {success} from "concurrently/dist/src/defaults";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {catchError, finalize, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  providers: [ConfirmationService, MessageService, AuthService]
})
export class RegisterPageComponent {
  emailPattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern:string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'

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

  showSpinner: boolean = false;
  registerButtonLock: boolean = false;

  onSubmit() {
    let registerObj: Register = {
      username: this.registerForm.value.email!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    }

    this.showSpinner = true;
    this.registerButtonLock = true;

    localStorage.setItem("firstName",this.registerForm.value.firstName!);
    localStorage.setItem("lastName", this.registerForm.value.lastName!);

    this.authService.register(registerObj)
      .pipe(
        catchError(error => {
          return of(error);
        }),
        finalize(() => {
          this.showSpinner = false;
          this.registerButtonLock = false;
        })
      )
      .subscribe({
        next: () => this.emailSent(),
        error: err => this.handleError(err)
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

  private emailNotSent(details: string) {
    this.confirmationService.confirm({
      message: `Error occurred while registration! Try again later...`,
      header: 'Email Verification',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email was not sent. Please try again later', life: 3000});
        console.log('Error details: ', details)
      }
    })
  }
  private handleError(httpErr: HttpErrorResponse){
      if(httpErr.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: `${httpErr.error.detail}`, life: 3000})
      }
      else if(httpErr.status === 500){
        this.emailNotSent(httpErr.error.detail)
      }
      else if(httpErr.status === 502){
        console.log("Error: ", httpErr)
      }
      else{
        console.log("Unhandled error status code: ", httpErr.status)
      }
  }
}
