import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { TokenResponse } from '../../shared/interfaces/token-response';

@Injectable()
export class JWTauthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private tokenRefreshSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem('access_token');

    if (token) {
      req = this.addTokenHeader(req, token);
    }

    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.tokenRefreshSubject.next(null);

      let tokens: TokenResponse = {
        access: localStorage.getItem('access_token')!,
        refresh: localStorage.getItem('refresh_token')!,
      }
      return this.authService.refreshToken(tokens).pipe(
        switchMap((tokens: TokenResponse) => {
          this.isRefreshing = false;
          this.tokenRefreshSubject.next(tokens.access);
          localStorage.setItem('access_token', tokens.access);
          localStorage.setItem('refresh_token', tokens.refresh);
          return next.handle(this.addTokenHeader(req, tokens.access));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          return throwError(error);
        })
      );
    } else {
      return this.tokenRefreshSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addTokenHeader(req, token));
        })
      );
    }
  }

  private addTokenHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
