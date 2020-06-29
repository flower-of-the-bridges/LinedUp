import { Component, OnInit } from '@angular/core';
import { MapController } from 'src/component/controller/MapController';
import { GeoController } from 'src/component/controller/GeoController';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  private geoController: GeoController
  private mapController: MapController
  constructor(private geolocation: Geolocation, private authService: AuthService, private httpClient: HttpClient, private router: Router, public modalController : ModalController) {

    this.geoController = new GeoController(this.geolocation);
  }

  ngOnInit() {

    this.authService.isLoggedIn().subscribe((res: boolean) => {
      console.log("is logged in res %o", res);
      if (/**res*/true) {
        let marker = null;

        const callback = (evt) => { console.log(evt); document.getElementById("reportForm").onsubmit = (evt) => evt.preventDefault(); };
        this.geoController.getUserPosition().then(pos => {
          console.debug("my pos is : " + pos);
          if (pos) {
            this.mapController = new MapController('map_queue', pos, this.httpClient);
            marker = this.mapController.addUser();
            this.mapController.getBuildings(this.modalController);
          }
        });
      }
      else {
        this.router.navigateByUrl('home');
      }
    })
  }

}
