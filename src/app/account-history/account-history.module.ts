import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountHistoryPageRoutingModule } from './account-history-routing.module';

import { AccountHistoryPage } from './account-history.page';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountHistoryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AccountHistoryPage, PaymentsComponent],
  entryComponents: [PaymentsComponent]
})
export class AccountHistoryPageModule {}
