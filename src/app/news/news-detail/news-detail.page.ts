import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ResourcesService } from 'src/app/services/resources.service';
import { News } from 'src/app/services/models';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

  isLoading = false;
  news: News;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private resourcesService: ResourcesService,
    private alrtCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('slug')) {
        this.navCtrl.navigateBack('/news');
        return;
      }
      this.isLoading = true;
      this.resourcesService.NewsItem(paramMap.get('slug')).subscribe(news => {
        this.news = news;
        this.isLoading = false;
      }, error => {
        this.alrtCtrl.create({
          header: 'An error occured!',
          message: 'Could not load news content.',
          buttons: [{ text: 'Okay', handler: () => {
            this.router.navigate(['/news']);
          }}]
        }).then(alertEl => alertEl.present());
      });
    });
  }

}
