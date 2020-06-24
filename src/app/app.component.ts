import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './Auth/auth.service';
import { AppState, Plugins } from '@capacitor/core';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSub: Subscription;
  private previousAuthState = false;
  clientName = '';
  rsaPin = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/login');
      }
      console.log('is authenticated: ' + isAuth);
      if (isAuth) {
        this.isAuthenticated = isAuth;
        this.authService.user.subscribe(user => {
          if (user !== null) {
            this.clientName = user.firstname.toUpperCase() + ' ' + user.lastname.toUpperCase();
            this.rsaPin = user._pin;
          }
        });
      } else {
        this.isAuthenticated = isAuth;
      }
      this.previousAuthState = isAuth;
    });
    Plugins.App.addListener(
      'appStateChange',
      this.checkAuthOnResume.bind(this)
    );
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    Plugins.App.removeAllListeners();
  }

  private checkAuthOnResume(state: AppState) {
    if (state.isActive) {
      this.authService
        .autoLogin()
        .pipe(take(1))
        .subscribe(success => {
          if (!success) {
            this.onLogout();
          }
        });
    }
  }
}
