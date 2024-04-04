import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient} from "@angular/common/http";
import {Login} from "../interfaces/login";
import {Register} from "../interfaces/register";
import {Router} from "@angular/router";
import {TokenResponse} from "../interfaces/token-response";
import {catchError, map, Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiSecurityUrl}/User`;
  result: Subject<boolean> = new Subject<boolean>();
  constructor(private readonly httpClient: HttpClient, private readonly router: Router) { }

  login(loginObj: Login){
    this.httpClient.post(this.apiUrl + '/login', loginObj)
      .subscribe(
        (res: any)=>{
          localStorage.setItem('access_token', res.accessToken)
          this.router.navigateByUrl('');
    })
  }

  register(registerObj: Register) {
    this.httpClient.post(this.apiUrl + '/register', registerObj)
      .pipe(
        catchError(error => {
          this.result.next(false)
          return of(error);
        })
      )
      .subscribe((res: any) =>{
          this.result.next(res.message === "Email has been sent!")
      })
  }
}
