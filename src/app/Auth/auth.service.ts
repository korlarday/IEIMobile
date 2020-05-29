import { Injectable, OnDestroy } from '@angular/core';
import { User } from './User';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserAuthData } from './userAuthData';
import { Plugins } from '@capacitor/core';

export interface UserObject {
  userpin: string;
  firstname: string;
  lastname: string;
  userid: string;
  username: string;
}
export interface AuthResponseData {
  userObject: UserObject;
  status: string;
  msg: string;
  userid: string;
  statusCode: string;
  staffObject: object;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  baseUrl = 'https://ffpro.ieianchorpensions.com/wildfly/FFPSelfService-web/rest/selfservice/';
  private user = new BehaviorSubject<UserAuthData>(null);
  private activeLogoutTimer: any;

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http
      .post<AuthResponseData>(this.baseUrl + 'userlogin', user)
      .pipe(tap(this.setUserData.bind(this)));
  }

  autoLogin() {
    return from(Plugins.Storage.get({ key: 'authData' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          pin: string;
          firstname: string;
          lastname: string;
          token: string;
          tokenExpirationDate: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new UserAuthData(
          parsedData.pin,
          parsedData.firstname,
          parsedData.lastname,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this.user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.user.next(null);
    Plugins.Storage.remove({ key: 'authData' });
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  get userIsAuthenticated() {
    return this.user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user._token;
        } else {
          return false;
        }
      })
    );
  }

  get token() {
    return this.user.asObservable().pipe(
      map(user => {
        if (user) {
          return user._token;
        } else {
          return null;
        }
      })
    );
  }

  get pin() {
    return this.user.asObservable().pipe(
      map(user => {
        if (user) {
          return user._pin;
        } else {
          return null;
        }
      })
    );
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + 3600 * 1000
    );
    if (userData.userObject !== null) {
      const user = new UserAuthData(
        userData.userObject.userpin,
        userData.userObject.firstname,
        userData.userObject.lastname,
        userData.userid, expirationTime);
      this.user.next(user);
      this.autoLogout(user.tokenDuration);
      this.storeAuthData(
        userData.userObject.userpin,
        userData.userObject.firstname,
        userData.userObject.lastname,
        userData.userid,
        expirationTime.toISOString(),
      );

    }
  }

  private storeAuthData(
    userPin: string,
    userFirstname: string,
    userLastname: string,
    userToken: string,
    userTokenExpirationDate: string) {
    const data = JSON.stringify({
      pin: userPin,
      firstname: userFirstname,
      lastname: userLastname,
      token: userToken,
      tokenExpirationDate: userTokenExpirationDate,
    });
    Plugins.Storage.set({ key: 'authData', value: data });
  }
}
