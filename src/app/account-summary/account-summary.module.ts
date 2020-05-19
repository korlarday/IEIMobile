import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountSummaryPageRoutingModule } from './account-summary-routing.module';

import { AccountSummaryPage } from './account-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSummaryPageRoutingModule
  ],
  declarations: [AccountSummaryPage]
})
export class AccountSummaryPageModule {}
