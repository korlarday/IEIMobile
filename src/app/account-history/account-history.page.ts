import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { PaymentsComponent } from './payments/payments.component';
import { AuthService } from '../Auth/auth.service';
import { EmployeeService } from '../services/employee.service';
import { PaymentHistoryReqModel } from '../services/paymentHistoryReqModel.model';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.page.html',
  styleUrls: ['./account-history.page.scss'],
})
export class AccountHistoryPage implements OnInit {
  form: FormGroup;
  from: Date;
  to: Date;
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private employeesService: EmployeeService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      from: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      to: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onShowPayments() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Loading... Please wait', mode: 'ios' })
      .then(loadingEl => {
        loadingEl.present();
        const from = new Date(this.form.value.from);
        const to = new Date(this.form.value.to);
        this.from = from;
        this.to = to;
        if (from > to) {
          this.from = to;
          this.to = from;
        }
        const yearDiff = this.to.getFullYear() - this.from.getFullYear();
        console.log(yearDiff);
        console.log(this.from.getFullYear());
        console.log(this.to.getFullYear());
        if (yearDiff > 3) {
          loadingEl.dismiss();
          this.showErrorMessage('Year difference must not be more than 3 years');
          return;
        }

        const dateFrom = this.sqlDateStringFormat(this.from);
        const dateTo = this.sqlDateStringFormat(this.to);

        this.authService.pin.subscribe(pin => {
          const paymentsReq = new PaymentHistoryReqModel(
            dateFrom,
            dateTo,
            pin
          );
          this.employeesService.paymentHistory(paymentsReq).subscribe(payments => {
            console.log(payments);
            let totalContributions = 0;
            let netContributions = 0;
            if (payments) {
              payments.forEach(payment => {
                totalContributions += payment.Total_Contribution;
                netContributions += payment.Net_Contribution;
              });
            }
            loadingEl.dismiss();
            this.modalCtrl.create({
              component: PaymentsComponent,
              componentProps: {
                from: this.from,
                to: this.to,
                payments,
                totalContributions,
                netContributions}
            })
            .then(modelEl => {
              modelEl.present();
              return modelEl.onDidDismiss();
            });
          });
        });

      });
  }

  showErrorMessage(message: string) {
    this.alertCtrl.create({
      message,
      buttons: ['Okay'],
      header: 'Error'
    })
    .then(hold => hold.present());
  }

  sqlDateStringFormat(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const monthFormat = this.zeroPad(month, 2);
    const year = date.getFullYear();
    return year + '-' + monthFormat + '-' + day;
  }

  zeroPad(num, places) {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }

}
