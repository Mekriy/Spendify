import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";
import {TokenResponse} from "../../shared/interfaces/token-response";

@Injectable()
export class JWTauthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private readonly authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    let authRequest = req;

    if(token != null){
      authRequest = this.addTokenHeader(authRequest, token);
    }

    return next.handle(authRequest).pipe(catchError((error : HttpErrorResponse) => {
      if (authRequest.url.includes('Login') && error.status === 401) {
        return this.handle401Error(authRequest, next);
      }

      return throwError(error);
    }));
  }

  private handle401Error(authRequest: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = localStorage.getItem('access_token');

      if (token) {
        let tokens: TokenResponse = {
          accessToken: localStorage.getItem('access_token')!,
          refreshToken: localStorage.getItem('refresh_token')!,
        }
        return this.authService.refreshToken(tokens).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            localStorage.setItem('access_token', token.accessToken);
            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(this.addTokenHeader(authRequest, token));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return throwError(err);
          })
        );
      }
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(authRequest, token)))
    );
  }

  private addTokenHeader(request: any, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
