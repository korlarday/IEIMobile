import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { Faq } from '../services/models';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  items: any = [];
  isLoading = false;
  faqs: Array<Faq> = new Array<Faq>();
  loadedFaqs: Array<Faq> = new Array<Faq>();
  general: Array<Faq> = new Array<Faq>();
  loadedGeneral: Array<Faq> = new Array<Faq>();
  rsa: Array<Faq> = new Array<Faq>();
  loadedRsa: Array<Faq> = new Array<Faq>();
  retirement: Array<Faq> = new Array<Faq>();
  loadedRetirement: Array<Faq> = new Array<Faq>();
  multifunds: Array<Faq> = new Array<Faq>();
  loadedMulifunds: Array<Faq> = new Array<Faq>();
  microPension: Array<Faq> = new Array<Faq>();
  loadedMicroPension: Array<Faq> = new Array<Faq>();
  covid: Array<Faq> = new Array<Faq>();
  loadedCovid: Array<Faq> = new Array<Faq>();
  category = 'all';
  allText = '';
  generalText = '';
  rsaText = '';
  retirementText = '';
  multiText = '';
  microText = '';
  covidText = '';

  constructor(
    private resourceService: ResourcesService,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.resourceService.Faqs().subscribe(faqs => {
      console.log(faqs);
      this.faqs = faqs;
      this.loadedFaqs = faqs;
      this.general = faqs.filter(faq => faq.category === 'General FAQs');
      this.loadedGeneral = this.general;
      this.rsa = faqs.filter(faq => faq.category === 'My Retirement Savings Account');
      this.loadedRsa = this.rsa;
      this.retirement = faqs.filter(faq => faq.category === 'About My Retirement');
      this.loadedRetirement = this.retirement;
      this.multifunds = faqs.filter(faq => faq.category === 'Multi Funds');
      this.loadedMulifunds = this.multifunds;
      this.microPension = faqs.filter(faq => faq.category === 'Micro Pension Funds');
      this.loadedMicroPension = this.microPension;
      this.covid = faqs.filter(faq => faq.category === 'Corvid 19');
      this.loadedCovid = this.covid;
      const faqNum = this.faqs.length;
      for (let index = 0; index < faqNum; index++) {
        if (index === 0) {
          this.items.push({ expanded: true});
        } else {
          this.items.push({ expanded: false});
        }
      }
      this.isLoading = false;
    },
    error => {
      this.alertCtrl.create({
        header: 'An error occured!',
        message: 'Could not fetch Faqs, please check back later.',
        buttons: [{ text: 'Okay', handler: () => {
          this.router.navigate(['/account-summary']);
        }}]
      }).then(alertEl => alertEl.present());
    });
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item === listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  filterFaqs(ev: any) {
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.faqs = this.faqs.filter((faq) => {
        return (faq.question.toLowerCase().indexOf(val.toLowerCase()) > -1 || faq.answer.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.faqs = this.loadedFaqs;
    }
  }
  filterGeneral(ev: any) {
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.general = this.general.filter((faq) => {
        return (faq.question.toLowerCase().indexOf(val.toLowerCase()) > -1 || faq.answer.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.general = this.loadedGeneral;
    }
  }
  filterRsa(ev: any) {
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.rsa = this.rsa.filter((faq) => {
        return (faq.question.toLowerCase().indexOf(val.toLowerCase()) > -1 || faq.answer.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.rsa = this.loadedRsa;
    }
  }
  filterRetirement(ev: any) {
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.retirement = this.retirement.filter((faq) => {
        return (faq.question.toLowerCase().indexOf(val.toLowerCase()) > -1 || faq.answer.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.retirement = this.loadedRetirement;
    }
  }
  filterMultifunds(ev: any) {
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.multifunds = this.multifunds.filter((faq) => {
        return (faq.question.toLowerCase().indexOf(val.toLowerCase()) > -1 || faq.answer.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.multifunds = this.loadedMulifunds;
    }
  }
  filterMicro(ev: any) {
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.microPension = this.microPension.filter((faq) => {
        return (faq.question.toLowerCase().indexOf(val.toLowerCase()) > -1 || faq.answer.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.microPension = this.loadedMicroPension;
    }
  }
  filterCovid(ev: any) {
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.covid = this.covid.filter((faq) => {
        return (faq.question.toLowerCase().indexOf(val.toLowerCase()) > -1 || faq.answer.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.covid = this.loadedCovid;
    }
  }
}
