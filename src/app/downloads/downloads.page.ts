import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { Download } from '../services/models';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.page.html',
  styleUrls: ['./downloads.page.scss'],
})
export class DownloadsPage implements OnInit {

  downloads: Array<Download>;
  loadedDownloads: Array<Download>;
  isLoading = false;
  selectedCategory = 'all';

  constructor(
    private resourcesService: ResourcesService,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.resourcesService.Downloads().subscribe(downloads => {
      this.downloads = downloads;
      this.loadedDownloads = downloads;
      this.isLoading = false;
    },
    error => {
      this.alertCtrl.create({
        header: 'An error occured!',
        message: 'Could not fetch downloads at the momemt.',
        buttons: [{ text: 'Okay', handler: () => {
          this.router.navigate(['/account-summary']);
        }}]
      }).then(alertEl => alertEl.present());
    });
  }

  filterDownloads(ev: any) {
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.downloads = this.downloads.filter((download) => {
        return (download.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      if (this.selectedCategory === 'all') {
        this.downloads = this.loadedDownloads;
      } else {
        this.downloads = this.loadedDownloads.filter(item => item.category === this.selectedCategory);
      }
    }
  }
  selectCategory(ev: any) {
    const val = ev.target.value;
    if (val !== 'all') {
      this.downloads = this.loadedDownloads.filter(item => item.category === val);
    } else {
      this.downloads = this.loadedDownloads;
    }
  }

}
