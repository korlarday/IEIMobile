import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AccountPage,
    children: [
      {
        path: 'account-summary', children: [
          {
            path: '',
            loadChildren: () => import('../account-summary/account-summary.module').then( m => m.AccountSummaryPageModule)
          }
        ]
      },
      {
        path: 'account-history', children: [
          {
            path: '',
            loadChildren: () => import('../account-history/account-history.module').then( m => m.AccountHistoryPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/account/tabs/account-summary',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/account/tabs/account-summary',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
