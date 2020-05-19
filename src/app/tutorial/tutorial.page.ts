import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  @ViewChild('slides', {static: false}) ionSlides: IonSlides;
  showSkip = true;
  dir = 'ltr';
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  doCheck() {
    const prom = this.ionSlides.isEnd();
    prom.then(data => {
      data ? this.showSkip = false : this.showSkip = true;
    });
  }


  startApp() {
    this.navCtrl.navigateForward('/welcome-page');
  }

}
