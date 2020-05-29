import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) {

    }
    token: string;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService.token.subscribe(token => {
            this.token = token;
        });
        if (this.token != null) {
            console.log("from interceptor available: " + this.token);
            // headers: req.headers.set('Authorization', this.token.toString())
            const clonedReq = req.clone({
                withCredentials: true,
                // setHeaders: {
                //     Accept: 'application/json',
                //     'Content-Type': 'application/json',
                //     // Cookie: 'loggedUser=' + this.token
                // }
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        // if (err.status === 401) {
                        //     this.authService.logout();
                        //     this.router.navigateByUrl('/login');
                        // }
                    }
                )
            );
        } else {
            console.log("from interceptor not available: " + this.token);
            return next.handle(req.clone());
        }

    }
}
