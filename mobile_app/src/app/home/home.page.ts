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
  
  isLoggedIn : boolean = false;
  
  constructor(private authService: AuthService, public menuCtrl: MenuController, private platform: Platform, private router: Router) { }

  ngOnInit() {
    
    this.authService.isLoggedIn().subscribe((res: boolean) => {
      console.log("is logged in res %o", res);
      if (res) {
        this.isLoggedIn = true;
      }
      
      this.menuCtrl.enable(this.isLoggedIn, 'menu'); 
    })
  }

  googleSignUp(){
    this.authService.googleSignUp(this.platform.is('cordova'), this.googleCallback.bind(this));
  }

  googleCallback(found: boolean){
    if(!found){
      this.router.navigateByUrl("register/university");
    }
    else{
      this.isLoggedIn = true;
    }
  }

}
