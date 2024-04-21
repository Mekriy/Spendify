import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BehaviorSubject, catchError, filter, finalize, Observable, of, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";
import {TokenResponse} from "../../shared/interfaces/token-response";

@Injectable()
export class JWTauthInterceptor implements HttpInterceptor {

  private isRefreshed = false;
  private tokenRefresh: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    let authRequest = req;

    if (token != null) {
      authRequest = this.addTokenHeader(authRequest, token);
    }

    return next.handle(authRequest).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return this.error401Handle(authRequest, next);
      }

      return throwError(error);
    }));
  }

  private error401Handle(request: HttpRequest<any>, next: HttpHandler) {
    this.isRefreshed = true;
    this.tokenRefresh.next(null);

    const token = localStorage.getItem('access_token');

    if (token) {
      let tokens: TokenResponse = {
        access: localStorage.getItem('access_token')!,
        refresh: localStorage.getItem('refresh_token')!,
      }
      return this.authService.refreshToken(tokens).pipe(
        switchMap((token: any) => {
          this.isRefreshed = false;

          localStorage.setItem('access_token', token.accessToken);
          this.tokenRefresh.next(token.accessToken);

          return next.handle(this.addTokenHeader(request, token));
        }),
        catchError((err) => {
          this.isRefreshed = false;

          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          return throwError(err);
        })
      );
    }
    return this.tokenRefresh.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: any, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
