import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { Branch, Expand } from '../services/models';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.page.html',
  styleUrls: ['./branches.page.scss'],
})
export class BranchesPage implements OnInit {
  items: Array<Expand> = new Array<Expand>();
  branches: Array<Branch>;
  loadedBranches: Array<Branch>;
  isLoading = false;
  constructor(
    private resourceService: ResourcesService,
    private alertCtrl: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.resourceService.Branches().subscribe(branches => {
      console.log(branches);
      this.branches = branches;
      this.loadedBranches = branches;
      const branchNum = this.branches.length;
      for (let index = 0; index < branchNum; index++) {
        if (index === 0) {
          this.items.push({ expanded: true});
        } else {
          this.items.push({ expanded: false});
        }
      }
      this.isLoading = false;
    },
    error => {
      this.alertCtrl.create({
        header: 'An error occured!',
        message: 'Could not fetch branches at the momemt.',
        buttons: [{ text: 'Okay', handler: () => {
          this.router.navigate(['/account-summary']);
        }}]
      }).then(alertEl => alertEl.present());
    });
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

  filterBranches(ev: any) {
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.branches = this.branches.filter((branch) => {
        return (branch.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.branches = this.loadedBranches;
    }
  }
}
