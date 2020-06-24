import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../Auth/auth.service';
import { AccountSummary } from '../services/models';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.page.html',
  styleUrls: ['./account-summary.page.scss'],
})
export class AccountSummaryPage implements OnInit {
  rsa = 'compulsory';
  pin: string;
  accountSummary: AccountSummary;
  isLoading = true;
  RSABalance: number;
  fundID: number;
  fundType: string;
  schemeName: string;
  totalContribution: number;
  netContribution: number;
  growth: number;
  totalUnits: number;
  unitPrice: number;

  vRSABalance: number;
  vfundType: string;
  vschemeName: string;
  vtotalContribution: number;
  vnetContribution: number;
  vGrowth: number;
  vTotalUnits: number;
  vUnitPrice: number;

  toDay: string;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.pin.subscribe(userPin => {
      this.pin = userPin;
      this.employeeService.accountSummary(this.pin).subscribe((accSummary: AccountSummary) => {
        this.accountSummary = accSummary;
        console.log(this.accountSummary);
        if(this.accountSummary != null){
          this.RSABalance = this.accountSummary.balanceMandatory;
          this.fundID = this.accountSummary.fundId;
          this.fundType = this.getFundType(this.fundID);
          this.schemeName = this.accountSummary.schemeName;
          this.totalContribution = this.accountSummary.totalContributionMandatory;
          this.netContribution = this.accountSummary.netContributionMandatory;
          this.growth = this.accountSummary.growthMandatory;
          this.totalUnits = this.accountSummary.totalUnitMandatory;
          this.unitPrice = this.accountSummary.unitPrice;
  
          // voluntary
          this.vRSABalance = this.accountSummary.balanceVoluntary;
          this.vschemeName = this.accountSummary.schemeName;
          this.vtotalContribution = this.accountSummary.totalContributionVoluntary;
          this.vnetContribution = this.accountSummary.netContributionVoluntary;
          this.vGrowth = this.accountSummary.growthVoluntary;
          this.vTotalUnits = this.accountSummary.totalUnitVoluntary;
          this.vUnitPrice = this.accountSummary.price;
  
          // get today's date
          const today = new Date();
          this.toDay = today.toDateString();
        }
        this.isLoading = false;
      },
      error => {
        this.alertCtrl.create({
          header: 'An error occured!',
          message: 'Could not fetch account summary at the momemt.',
          buttons: [{ text: 'Okay', handler: () => {
            // this.router.navigate(['/news']);
          }}]
        }).then(alertEl => alertEl.present());
      });

    });
  }

  getFundType(fundID: number) {

    let selectedFundID = 'RSA FUND ';

    switch (fundID) {
      case 1:
          selectedFundID += 'II';
          break;
      case 73:
      selectedFundID += 'I';
      break;
      case 74:
      selectedFundID += 'III';
      break;
      case 12:
      selectedFundID += 'IV';
      break;
    }

    return selectedFundID;
  }

  segmentChanged(event) {
    console.log(event);
  }

}
