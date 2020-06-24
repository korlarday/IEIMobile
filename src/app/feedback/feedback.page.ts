import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../Auth/auth.service';
import { EmployeeService } from '../services/employee.service';
import { Feedback } from '../services/Feedback.model';
import { ResourcesService } from '../services/resources.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  form: FormGroup;
  feedback: Feedback;
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private resourcesService: ResourcesService
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      subject: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      message: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  OnSubmitForm() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Sending message... Please wait',
      mode: 'ios'
    })
    .then(loadingEl => {
      loadingEl.present();

      this.authService.pin.subscribe(userPin => {
        this.employeeService.getProfile(userPin).subscribe(bioData => {
          const name = bioData.employees.firstname + ' ' + bioData.employees.surname;
          const email = bioData.employees.email;
          const mobile = bioData.employees.mobilePhone;
          const employer = bioData.employees.employerName;

          this.feedback = new Feedback(
            name,
            email,
            mobile,
            bioData.employees.pin,
            employer,
            this.form.value.subject,
            this.form.value.type,
            this.form.value.message
          );

          console.log(this.feedback);
          this.resourcesService.SendFeedback(this.feedback).subscribe(success => {
            loadingEl.dismiss();
            this.showMessage('Success', 'Your feedback was sent successfully, thank you.');
            this.form.reset();
          }, error => {
            loadingEl.dismiss();
            this.showMessage('Error', 'Sorry, an error occured. Please try again later');
          });
        },
        error => {
          loadingEl.dismiss();
          this.showMessage('Error', 'Sorry, an error occured. Please try again later');
        });
      });
    });

  }

  showMessage(subject: string, message: string) {
    this.alertCtrl.create({
      header: subject,
      message,
      buttons: [{ text: 'Okay', handler: () => {
        // this.router.navigate(['/news']);
      }}]
    }).then(alertEl => alertEl.present());
  }

}
