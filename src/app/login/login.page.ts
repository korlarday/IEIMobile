import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, AuthResponseData } from '../Auth/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { User } from '../Auth/User';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';

export interface FailedLogin {
  userObject: object;
  status: string;
  msg: string;
  userid: number;
  statusCode: string;
  staffObject: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  isLoading = false;
  authSubscription: Subscription;
  pin = '';
  password = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }


  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.authSubscription = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigateByUrl('/account/tabs/account-summary');
      }
    });
  }

  authenticate(pin: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...', mode: 'ios' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        const user = new User(pin, password);
        authObs = this.authService.login(user);

        authObs.subscribe(
          resData => {
            console.log(resData.msg);
            this.isLoading = false;
            loadingEl.dismiss();
            if (resData.status === 'failed') {
              // let message = 'Could not sign in at the moment, please try again.';
              this.showAlert(resData.msg);
            } else {
              this.router.navigateByUrl('/account');
            }
          },
          (error: FailedLogin) => {
            loadingEl.dismiss();
            let message = 'Could not sign in at the moment, please try again.';
            // if (error.error.status !== null && error.error.status === 'Failed') {
            //   message = error.error.message;
            // }
            if (error.status === 'failed') {
              message = error.msg;
            }
            this.showAlert(message);
          }
        );
      });
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const pin = form.value.pin;
    const password = form.value.password;
    this.authenticate(pin, password);
    // form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

}
