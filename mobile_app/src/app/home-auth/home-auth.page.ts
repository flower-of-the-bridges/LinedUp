import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.page.html',
  styleUrls: ['./home-auth.page.scss'],
})
export class HomeAuthPage implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, public menuCtrl: MenuController, private router: Router) { }

  ngOnInit() {

    this.authService.isLoggedIn().subscribe((res: boolean) => {
      console.log("is logged in res %o", res);
      if (res) {
        this.isLoggedIn = true;

        this.menuCtrl.enable(this.isLoggedIn, 'menu');
      }
      else{
        this.router.navigateByUrl("/home");
      }

    })
  }

  goToMap(){
    this.router.navigateByUrl("/map");
  }


}
