import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  private placeList: Array<any> = [];
  private interval: any = null;

  constructor(private authService: AuthService, private router: Router) {
 
  }

  ngOnInit() {
    this.authService.getFavourites().then(favourites => {
      console.log("favourites are %o", favourites);
      if (favourites && favourites.length > 0) {
        this.authService.getFavouritePlaces(favourites).subscribe(res => {
          if (Array.isArray(res)) {
            this.placeList = res;
          }
        })
      }
    })
  }

  selectQueue(queue){
    this.authService.selectPlace(queue);
    this.router.navigateByUrl("/map");
  }

}
