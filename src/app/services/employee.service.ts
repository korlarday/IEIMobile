import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountSummary } from './models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = 'https://ffpro.ieianchorpensions.com/wildfly/FFPSelfService-web/rest/selfservice/';

  constructor(private httpClient: HttpClient) { }

  getProfile(pin: string) {

  }
  accountSummary(userPin: string) {
    return this.httpClient.post<AccountSummary>(this.baseUrl + 'getsummary', {pin : userPin});
  }
}
