import { Injectable } from '@angular/core';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  // reAuthenticate():Observable<HttpEvent<any>> {
  //   return retry()
  // }

  intercept(
    request: HttpRequest<unknown>,
    // response: HttpErrorResponse<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.auth.getLocalStorage('token');
    const tokenExp = new Date(this.auth.getLocalStorage('tokenExp'));
    const now = new Date();
    if (tokenExp <= now) {
      this.auth.removeLocalStorage();
    }
    else if (token) {
      request = request.clone({
        setHeaders: { Authorization: 'Token ' + token },
      });
    }
    return next.handle(request);
  }
}
