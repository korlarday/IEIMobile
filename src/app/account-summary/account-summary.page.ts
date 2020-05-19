import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.page.html',
  styleUrls: ['./account-summary.page.scss'],
})
export class AccountSummaryPage implements OnInit {
  rsa = 'compulsory';
  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event) {
    console.log(event);
  }

}
