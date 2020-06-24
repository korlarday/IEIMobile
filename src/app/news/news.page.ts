import { Component, OnInit } from '@angular/core';
import { News } from '../services/models';
import { ResourcesService } from '../services/resources.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  latestNews: News;
  otherNews: Array<News>;
  isLoading = false;

  constructor(private resourcesService: ResourcesService) { }

  ngOnInit() {
    this.isLoading = true;
    this.resourcesService.News().subscribe((news: Array<News>) => {
      this.latestNews = news.shift();
      this.otherNews = news;
      this.isLoading = false;
      console.log(this.otherNews);
    });
  }

}
