import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Branch, Download, Faq, News } from './models';
import { RegisterClient } from './client.model';
import { AuthService } from '../Auth/auth.service';
import { EmployeeService } from './employee.service';
import { Feedback } from './Feedback.model';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService,
    private authService: AuthService) { }

  private branchesUrl = 'https://ieianchorpensions.com/api/api_branches';
  private downloadUrl = 'https://ieianchorpensions.com/api/api_downloads';
  private faqUrl = 'https://ieianchorpensions.com/api/api_faqs';
  private newsUrl = 'http://127.0.0.1:8000/api/api_news';
  private registerUrl = 'http://127.0.0.1:8000/api/api_customers_register';
  private feedbackUrl = 'http://127.0.0.1:8000/api/api_customers_feedback';
  states = [
    { name: 'FCT Abuja', value: 'Abuja'},
    { name: 'Abia', value: 'Abia'},
    { name: 'Adamawa', value: 'Adamawa'},
    { name: 'Akwa Ibom', value: 'Akwa Ibom'},
    { name: 'Anambra', value: 'Anambra'},
    { name: 'Bauchi', value: 'Bauchi'},
    { name: 'Bayelsa', value: 'Bayelsa'},
    { name: 'Benue', value: 'Benue'},
    { name: 'Borno', value: 'Borno'},
    { name: 'Cross River', value: 'Cross River'},
    { name: 'Delta', value: 'Delta'},
    { name: 'Ebonyi', value: 'Ebonyi'},
    { name: 'Edo', value: 'Edo'},
    { name: 'Ekiti', value: 'Ekiti'},
    { name: 'Enugu', value: 'Enugu'},
    { name: 'Gombe', value: 'Gombe'},
    { name: 'Imo', value: 'Imo'},
    { name: 'Jigawa', value: 'Jigawa'},
    { name: 'Kaduna', value: 'Kaduna'},
    { name: 'Kano', value: 'Kano'},
    { name: 'Katsina', value: 'Katsina'},
    { name: 'Kebbi', value: 'Kebbi'},
    { name: 'Kogi', value: 'Kogi'},
    { name: 'Kwara', value: 'Kwara'},
    { name: 'Lagos', value: 'Lagos'},
    { name: 'Nasarawa', value: 'Nasarawa'},
    { name: 'Niger', value: 'Niger'},
    { name: 'Ogun', value: 'Ogun'},
    { name: 'Ondo', value: 'Ondo'},
    { name: 'Osun', value: 'Osun'},
    { name: 'Oyo', value: 'Oyo'},
    { name: 'Plateau', value: 'Plateau'},
    { name: 'Rivers', value: 'Rivers'},
    { name: 'Sokoto', value: 'Sokoto'},
    { name: 'Taraba', value: 'Taraba'},
    { name: 'Yobe', value: 'Yobe'},
    { name: 'Zamfara', value: 'Zamfara'}
  ];

  Branches() {
    return this.http.get<Array<Branch>>(this.branchesUrl);
  }

  Downloads() {
    return this.http.get<Array<Download>>(this.downloadUrl);
  }

  Faqs() {
    return this.http.get<Array<Faq>>(this.faqUrl);
  }

  News() {
    return this.http.get<Array<News>>(this.newsUrl);
  }

  NewsItem(slug: string) {
    return this.http.get<News>(this.newsUrl + '/' + slug);
  }

  RegisterClient(details: RegisterClient) {
    const formData = new FormData();
    formData.append('dob', details.dob);
    formData.append('email', details.email);
    formData.append('employer', details.employer);
    formData.append('employer_address', details.employer_address);
    formData.append('firstname', details.firstname);
    formData.append('lastname', details.lastname);
    formData.append('nin', details.nin);
    formData.append('phone', details.phone);
    formData.append('state', details.state);
    formData.append('image', details.image);
    console.log(formData);
    return this.http.post(this.registerUrl, formData);
  }

  SendFeedback(feedback: Feedback) {
    return this.http.post(this.feedbackUrl, feedback);
  }
}
