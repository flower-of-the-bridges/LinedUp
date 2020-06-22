import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { GeoController } from '../../component/controller/GeoController';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapController } from '../../component/controller/MapController';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  private geoController: GeoController
  private mapController: MapController
  constructor(private geolocation: Geolocation, private authService: AuthService, private httpClient: HttpClient, private router: Router, public menuCtrl: MenuController) {

    this.geoController = new GeoController(this.geolocation);
  }

  ngOnInit() {

    this.authService.isLoggedIn().subscribe((res: boolean) => {
      console.log("is logged in res %o", res);
      if (/**res*/true) {

        this.menuCtrl.enable(true, 'menu');

        let marker = null;

        const callback = (evt) => { console.log(evt); document.getElementById("reportForm").onsubmit = (evt) => evt.preventDefault(); };
        this.geoController.getUserPosition().then(pos => {
          console.debug("my pos is : " + pos);
          if (pos) {
            this.mapController = new MapController('map', pos, this.httpClient);
            marker = this.mapController.addUser();
            this.mapController.getPositions();
          }
        });
      }
      else {
        this.router.navigateByUrl('home');
      }
    })
  }
}
