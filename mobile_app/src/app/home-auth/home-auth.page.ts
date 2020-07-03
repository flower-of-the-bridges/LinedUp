import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.page.html',
  styleUrls: ['./home-auth.page.scss'],
})
export class HomeAuthPage implements OnInit {

  constructor(private authService: AuthService, public menuCtrl: MenuController, private router: Router) { }

  ngOnInit() {

    this.menuCtrl.enable(true, "menu");

    this.authService.isLoggedIn().then((res: any) => {
      console.log("is logged in res %o", res);
      if (!res) {
        this.authService.hasUserLoggedIn().subscribe((response: any) => {
          console.log("has logged in res %o", response);
          if (response == false) {
            this.router.navigateByUrl("/home");
          }
        })
      }

    })
  }
  
  goToMap() {
    this.router.navigateByUrl("/map");
  }


}
