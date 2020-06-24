import { Component, OnInit } from '@angular/core';
import { BioData } from '../services/models';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../Auth/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public items: any = [];
  bioData: BioData;
  isLoading = false;
  pin: string;
  dateOfBirth: string;
  gender: string;
  stateOfPosting: string;
  nokState: string;
  employerState: string;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.pin.subscribe(pin => {
      this.pin = pin;
      this.employeeService.getProfile(pin).subscribe(bioData => {
        this.bioData = bioData;
        this.dateOfBirth = this.formatAPIDates(bioData.employees.dateOfBirth);
        this.gender = this.EmployeeGender(bioData.employees.gender);
        this.stateOfPosting = this.ToTitleCase(bioData.states.find(x => x.code === bioData.employees.stateOfPosting).description);
        this.nokState = this.ToTitleCase(bioData.states.find(x => x.code === bioData.employees.nokStatecode).description);
        this.employerState = this.ToTitleCase(bioData.states.find(x => x.code === bioData.employees.employerStatecode).description);
        this.bioData.employees.firstname = this.ToTitleCase(this.bioData.employees.firstname);
        this.bioData.employees.surname = this.ToTitleCase(this.bioData.employees.surname);
        this.bioData.employees.nokRelationship = this.ToTitleCase(this.bioData.employees.surname);
        this.isLoading = false;
      },
      error => {
        this.alertCtrl.create({
          header: 'An error occured!',
          message: 'Could not fetch your profile at the momemt.',
          buttons: [{ text: 'Okay', handler: () => {
            this.router.navigate(['/account-summary']);
          }}]
        }).then(alertEl => alertEl.present());
      });
    });

    this.items = [
      { expanded: true },
      { expanded: false },
      { expanded: false },
    ];
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

  formatAPIDates(receivedDate) {
    const strippedDob = receivedDate.replace('[UTC]', '');

    const parsedDate = new Date(Date.parse(strippedDob));
    // console.log('parsedDate '+parsedDate);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = parsedDate.getFullYear();
    const month = months[parsedDate.getMonth()];
    const date = parsedDate.getDate();

    return date + ' ' + month + ' ' + year ;
  }

  EmployeeGender(genderCode: string) {
    let gender = '';
    switch (genderCode) {
      case 'M':
        gender = 'Male';
        break;
      case 'F':
        gender = 'Female';
        break;
      default:
        gender = 'Male';
        break;
    }
    return gender;
  }

  ToTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}



}
