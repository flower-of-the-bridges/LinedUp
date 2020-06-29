import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { GeoController } from '../../component/controller/GeoController';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapController } from '../../component/controller/MapController';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Position } from 'src/component/entity/Position';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  private geoController: GeoController
  private mapController: MapController

  private queueSearch: string = null;
  private searchList: Array<any> = [];
  private viewResult: boolean = false;

  constructor(private geolocation: Geolocation, private authService: AuthService, private httpClient: HttpClient, private router: Router, public menuCtrl: MenuController) {

    this.geoController = new GeoController(this.geolocation);
  }

  ngOnInit() {

    this.authService.isLoggedIn().subscribe((res: boolean) => {
      console.log("is logged in res %o", res);
      if (/**res*/true) {

        this.menuCtrl.enable(true, 'menu');

        this.initMap(null, null);
        //const callback = (evt) => { console.log(evt); document.getElementById("reportForm").onsubmit = (evt) => evt.preventDefault(); };

      }
      else {
        this.router.navigateByUrl('home');
      }
    })
  }

  search(queue: string) {
    if (queue != "") {
      if ((this.queueSearch == null || this.viewResult) && this.mapController) {
        // destroy map if it was defined
        this.mapController.destroyMap();

        if (this.viewResult) {
          this.viewResult = false;
        }
      }


      this.authService.searchQueue(queue, null).subscribe(res => {
        if (Array.isArray(res)) {
          this.searchList = res;
        }
      });
      this.queueSearch = queue;
    }
    else {
      this.queueSearch = null;
      if (!this.viewResult) {
        this.initMap(null, null);
      }
    }
    console.log("queue is %s", this.queueSearch);
  }

  selectQueue(queue: any) {
    console.log("queue is %o", queue);
    this.viewResult = true;
    this.initMap(new Position(queue.position.lat, queue.position.lon, 100), queue.name);//JSON.stringify(queue.position));
  }

  initMap(queuePosition: any, showPopup: string) {

    let marker = null;

    this.geoController.getUserPosition().then(pos => {
      console.debug("my pos is : " + pos);
      if (pos) {
        this.mapController = new MapController('map', pos, queuePosition || pos, this.httpClient, showPopup);
        marker = this.mapController.addUser();
        this.mapController.getPositions();
      }
    });
  }
}
