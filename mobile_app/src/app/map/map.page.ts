import { Component, OnInit } from '@angular/core';
import { GeoController } from '../../component/controller/GeoController';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapController } from '../../component/controller/MapController';
import { User } from 'src/component/entity/User';
import { HttpClient } from '@angular/common/http';
import { Position } from 'src/component/entity/Position';
import { ReportService } from '../report/report.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  private geoController: GeoController
  private mapController: MapController
  private staticUser: User = new User("giov", true);
  constructor(private geolocation: Geolocation, private http: HttpClient, private reportService: ReportService, public menuCtrl: MenuController) {
    
    this.geoController = new GeoController(this.geolocation);
  }

  ngOnInit() {
    let marker = null;

    const callback = (evt) => { console.log(evt); document.getElementById("reportForm").onsubmit = (evt) => evt.preventDefault();};
    this.geoController.getUserPosition(this.staticUser).then(pos => {
      console.debug("my pos is : " + pos);
      if (pos) {
        this.mapController = new MapController('map', pos, this.reportService);
        marker = this.mapController.addUser();
      }
    });

    
    this.menuCtrl.enable(true, 'menu'); 

  }

  updateUserPosition(newPosition: Position) {
  }

  ionViewWillEnter() {
    //this.geoController && this.mapController && !this.geoController.isSessionPositionUpdating() && this.geoController.checkForPositionUpdates(null/**this.mapController.updateUserMarker.bind(this.mapController)*/);
  }

  ionViewWillLeave() {
    //this.geoController.stopPositionUpdates();
  }

}
