import { Component} from '@angular/core';
import { Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.sideMenu()
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
  }

  sideMenu() {
    this.navigate = [
      {
        title: "Home",
        url: "/home-auth",
        icon: "home"
      },
      {
        title: "Map",
        url: "/map",
        icon: "map"
      },
      {
        title: "New Queue",
        url: "/insert",
        icon: "add-circle"
      },
      {
        title: "News",
        url: "/news",
        icon: "newspaper"
      },
      {
        title: "Favourites",
        url: "/favourites",
        icon: "star"
      },
      {
        title: "Help",
        url: "/help",
        icon: "help"
      },
      {
        title: "Logout",
        action: "logout",
        icon: "exit"
      }

    ];
  }

  logout(){
    this.authService.logout().then(res => {
      console.log("logout: %o", res);
      this.router.navigateByUrl("/home");
    })
  }
}
