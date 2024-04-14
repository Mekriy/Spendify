import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BehaviorSubject, catchError, filter, finalize, Observable, of, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";
import {TokenResponse} from "../../shared/interfaces/token-response";
import {Route, Router} from "@angular/router";

@Injectable()
export class JWTauthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('Login')) {
      return next.handle(request)
    }

    let authRequest = request
    let token = localStorage.getItem('access_token');
    if (token != null) {
      authRequest = this.addTokenHeader(request, token)
    }

    return next.handle(authRequest)
      .pipe(
        catchError(error => {
          this.handleError(authRequest, next)
          return of(error)
        })
      )
  }
  private addTokenHeader(request: any, token: string) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

  private handleError(authRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      this.tokenSubject.next('');
      let tokens: TokenResponse = {
        access: localStorage.getItem('access_token')!,
        refresh: localStorage.getItem('refresh_token')!
      }

      return this.authService.refreshToken(tokens)
        .pipe(
          switchMap((res: any) => {
            if(res){
              localStorage.setItem('access_token', res.access);
              localStorage.setItem('refresh_token', res.refresh);
              this.tokenSubject.next(res.access);
              return next.handle(this.addTokenHeader(authRequest, res.access))
            }
            this.authService.logout()
            throw new Error('');
          }),
          catchError(error => {
            this.isRefreshing = false;
            throw new Error(error);
          }),
          finalize(() => {
            this.isRefreshing = false;
          })
        )
    }
    else {
      return this.tokenSubject
        .pipe(
          filter( token => token != null),
          take(1),
          switchMap((res: any)=> {
            return next.handle(this.addTokenHeader(authRequest, res.access))
          })
        )
    }
  }
}
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
