import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { RegisterClient } from '../services/client.model';
import { Router } from '@angular/router';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  states = this.resourcesServices.states;
  isLoading = false;
  form: FormGroup;
  constructor(
    private resourcesServices: ResourcesService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstname: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      surname: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email, Validators.maxLength(180)]
      }),
      phone: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dob: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      state: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      nin: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      employer: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      employerAddress: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      medium: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  OnSubmitForm() {
    if (!this.form.valid) {
      return;
    }

    const date = new Date(this.form.value.dob);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const monthFormat = this.zeroPad(month, 2);
    const year = date.getFullYear();
    const dob = day + '-' + monthFormat + '-' + year;
    const clientDetails = new RegisterClient(
      this.form.value.firstname,
      this.form.value.surname,
      dob,
      this.form.value.email,
      this.form.value.phone,
      this.form.value.state,
      this.form.value.employer,
      this.form.value.employerAddress,
      this.form.value.image,
      this.form.value.nin);

    console.log(clientDetails);
    this.loadingCtrl.create({
      message: 'Registration in progress... Please wait'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.resourcesServices.RegisterClient(clientDetails)
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.alertCtrl.create({
            header: 'Success',
            message: 'Your registration was successful, one of our agents will contact you soon to complete your registration. Thank you.',
            buttons: [{ text: 'Okay', handler: () => {
              this.router.navigate(['/news']);
            }}]
          }).then(alertEl => alertEl.present());
        }, error => {
          loadingEl.dismiss();
          this.alertCtrl.create({
            header: 'Registration failed',
            message: 'Sorry, an error occured. Please try again later.',
            buttons: [{ text: 'Okay', handler: () => {
              // this.router.navigate(['/news']);
            }}]
          }).then(alertEl => alertEl.present());
        });
    });

  }

  zeroPad(num, places) {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }
}
