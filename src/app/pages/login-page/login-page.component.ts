import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Login} from "../../shared/interfaces/login";
import {CreateUser} from "../../shared/interfaces/create-user";
import {Route, Router} from "@angular/router";
import {catchError, finalize, of, switchMap, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorResponse} from "../../shared/interfaces/error-response";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  providers: [AuthService, Router, MessageService]
})
export class LoginPageComponent {
  emailPattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern:string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'
  showSpinner: boolean = false;
  loginButtonLock: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService) {}


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
    this.showSpinner = true;
    this.loginButtonLock = true;

    this.authService.isUserExists(loginObj.email)
      .pipe(
        finalize(() => {
          this.showSpinner = false;
          this.loginButtonLock = false;
        })
      )
      .subscribe({
        next: () => this.login(loginObj),
        error: err => {
          this.messageService.add({ severity:'error', summary:'Error!', detail:'Wrong email! User doesn\'t exist', life:3000})
        }
      })
  }
  private login(loginObj: Login) {
    this.authService.login(loginObj)
      .pipe(
        switchMap((res: any) => {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
          return this.authService.isUserCreated()
            .pipe(
              catchError( httpErr => {
                return of(httpErr);
              }),
              finalize(() => {
                this.showSpinner = false;
                this.loginButtonLock = false;
              })
            )
        }),
        finalize( () => {
          this.showSpinner = false;
          this.loginButtonLock = false;
        })
      )
      .subscribe({
        next: () =>{
          this.router.navigateByUrl('/your-expenses')
        },
        error: err => this.handleError(err)
      })
  }
  private createUser(){
    let userObj: CreateUser = {
      firstName: localStorage.getItem("firstName")!,
      lastName: localStorage.getItem("lastName")!,
    }

    this.authService.createUser(userObj)
      .pipe(
        catchError(error => {
          return of(error)
        })
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/your-expenses'),
        error: (err) => this.handleError(err)
      })
  }
  private handleError(httpErr: HttpErrorResponse){
      if(httpErr.status === 404){
        this.createUser();
      }
      else if(httpErr.status === 401){
        this.messageService.add({ severity: 'error', summary:'Error!', detail:'User doesn\'t exist! Check your email please', life: 3000})
      }
      else if(httpErr.status === 500){
        this.messageService.add({ severity: 'error', summary:'Error!', detail:`Something went wrong... Please try again later`, life: 3000})
      }
      else if(httpErr.status === 400){
        if(httpErr.error.title === "Email is not confirmed"){
          this.messageService.add({ severity: 'error', summary:'Error!', detail:`${httpErr.error.detail}`, life: 3000})
        }
        else if(httpErr.error.title === "Wrong password"){
          this.messageService.add({ severity: 'error', summary:'Error!', detail:`${httpErr.error.detail}`, life: 3000})
        }
        else {
          this.messageService.add({ severity: 'error', summary:'Error!', detail:`Something went wrong...`, life: 3000})
          console.log("Unhandled error description: ", httpErr.error.detail)
        }
      }
      else{
        console.log("Unhandled status code error", httpErr.status)
      }
  }
}
