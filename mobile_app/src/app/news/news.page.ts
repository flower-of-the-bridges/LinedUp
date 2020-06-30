import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  private newsList: Array<any> = [];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.authService.getNews().subscribe(res => {
      this.newsList = res;
    })
  }

  selectNews(place : any){
    this.authService.selectPlace(place).then(() => {
      this.router.navigateByUrl("/map");
    });
  }

}
