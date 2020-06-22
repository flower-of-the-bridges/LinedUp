import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  isLoggedIn : boolean = false;
  
  constructor(private authService: AuthService, public menuCtrl: MenuController) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((res: boolean) => {
      console.log("is logged in res %o", res);
      if (res) {
        this.isLoggedIn = true;
        
        console.log(this.isLoggedIn);

      }
      
      this.menuCtrl.enable(this.isLoggedIn, 'menu'); 
    })
  }

}
