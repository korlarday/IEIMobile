import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.page.html',
  styleUrls: ['./branches.page.scss'],
})
export class BranchesPage implements OnInit {
  items: any = [];
  constructor() { }

  ngOnInit() {
    this.items = [
      { expanded: true },
      { expanded: false },
      { expanded: false },
      { expanded: false },
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

  // filterBranches(ev: any) {
  //   let val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.branches = this.branches.filter((branch) => {
  //       return (branch.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   } else {
  //     this.loadBranches();
  //   }
  // }
}
