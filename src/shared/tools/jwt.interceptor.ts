import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let currentUser = this.authService.currentUserValue
        // if (currentUser && currentUser.id) {
        //     req = req.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${currentUser.id}`
        //         }
        //     })
        // }
        // console.log('JwtInterceptor :::> ', req)
        return next.handle(req)
    }
}
