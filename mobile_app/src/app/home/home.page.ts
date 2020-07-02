import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService, public menuCtrl: MenuController, private platform: Platform, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn().then((res: boolean) => {
      console.log("is logged in res %o", res);
      if (res) {
        this.router.navigateByUrl("/home-auth");
      }
    })
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false, 'menu');
  }

  googleSignUp() {
    this.authService.googleSignUp(this.platform.is('cordova'), this.googleCallback.bind(this));
  }

  googleCallback(found: boolean) {
    console.log("found is %s", found);
    if (!found) {
      this.router.navigateByUrl("/register/university");
    }
    else {
      this.menuCtrl.enable(true, "menu");
      this.router.navigateByUrl("/home-auth");
    }
  }

  
  goToMap(){
    this.router.navigateByUrl("/map");
  }


}
