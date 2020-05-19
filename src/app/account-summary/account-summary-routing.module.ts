import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSummaryPage } from './account-summary.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSummaryPageRoutingModule {}
