import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MODE_DEBUG } from '../../app/config/config';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()

export class ErrorInterceptorService implements HttpInterceptor {
    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req)
        .pipe(catchError(err => {
            if (MODE_DEBUG) { console.log('ErrorInterceptor detected:::> ', req.url) }
            return throwError(err);
        }));
      }

}
