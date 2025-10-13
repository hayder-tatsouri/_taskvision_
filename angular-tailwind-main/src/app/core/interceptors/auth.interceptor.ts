import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EMPTY } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // get access token
    let clonedReq = req;

    if (token) {
      clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(clonedReq).pipe(
      catchError((err: HttpErrorResponse) => {
        // If 401, try refresh
        if (err.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
           return this.authService.refreshToken() ?? EMPTY.pipe(
              switchMap(() => {
                const newToken = localStorage.getItem('token');
                const retryReq = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${newToken}`)
                });
                return next.handle(retryReq);
              })
            );
          }
        }
        return throwError(() => err);
      })
    );
  }
}
