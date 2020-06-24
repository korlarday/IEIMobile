import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountSummary, BioData, PaymentHistoryModel } from './models';
import { PaymentHistoryReqModel } from './paymentHistoryReqModel.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = 'https://ffpro.ieianchorpensions.com/wildfly/FFPSelfService-web/rest/selfservice/';
  privateHistoryUrl = 'https://localhost:44330/api/funding/postallfundings';
  constructor(private httpClient: HttpClient) { }

  getProfile(pin: string) {
    return this.httpClient.post<BioData>(this.baseUrl + 'view-biodata', {pin});
  }
  accountSummary(pin: string) {
    return this.httpClient.post<AccountSummary>(this.baseUrl + 'getsummary', {pin});
  }
  paymentHistory(reqDetails: PaymentHistoryReqModel) {
    return this.httpClient
    .post<Array<PaymentHistoryModel>>(this.privateHistoryUrl, reqDetails, { headers: { skip: 'true'}});
  }
}
