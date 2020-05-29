import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router, private authService: AuthService) {}

  canLoad(route: Route, segments: UrlSegment[]):
  Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userIsAuthenticated.pipe(
      take(1),
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          return this.authService.autoLogin();
        } else {
          return of(isAuthenticated);
        }
      }),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}

