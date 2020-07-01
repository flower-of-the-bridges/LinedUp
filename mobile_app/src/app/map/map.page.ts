import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { GeoController } from '../../component/controller/GeoController';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapController } from '../../component/controller/MapController';
import { MenuController, LoadingController } from '@ionic/angular';
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

  private openQueues = false;

  private queueSearch: string = null;
  private searchList: Array<any> = [];
  private viewResult: boolean = false;

  private filters: any = {
    type: [
      { name: "Secretariat", value: "secretariat" },
      { name: "Office hours", value: "office hours" },
      { name: "Canteen", value: "canteen" }
    ],
    status: [
      { name: "Opened", value: 1 },
      { name: "Closed", value: 0 }
    ]
  }

  private filter: any = {
    type: null,
    status: null
  }

  private filterSection: boolean = false;

  constructor(public loadingController: LoadingController, private geolocation: Geolocation, private authService: AuthService, private httpClient: HttpClient, private router: Router, public menuCtrl: MenuController) {

    this.geoController = new GeoController(this.geolocation);
  }

  ionViewWillEnter(){

    this.presentLoading();
  }
  ngOnInit() {
    this.authService.isLoggedIn().subscribe((res: boolean) => {
      console.log("is logged in res %o", res);
      if (/**res*/true) {

        this.authService.getPlace().subscribe(place => {
          console.log("place is %o", place);
          this.menuCtrl.enable(true, 'menu');
          if (place != null) {
            this.initMap(null, place.name);
          }
          else {

            this.initMap(null, null);
          }

        })

        //const callback = (evt) => { console.log(evt); document.getElementById("reportForm").onsubmit = (evt) => evt.preventDefault(); };

      }
      else {
        this.router.navigateByUrl('home');
      }
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  
  ionViewWillLeave(){
    if(this.mapController){
      this.mapController.destroyMap();
      console.log("map destroyed");
    }
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


      this.authService.searchQueue(queue, this.filter).subscribe(res => {
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

  selectType(type: string) {
    this.filter.type = type;
    console.log("filter is %o", this.filter);
    this.search(this.queueSearch);
  }

  selectStatus(status: number) {
    this.filter.status = status;
    console.log("filter is %o", this.filter);
    this.search(this.queueSearch);
  }

  changeFilterSection() {
    this.filterSection = !this.filterSection;
  }

  clearFilter() {
    this.filter.type = null;
    this.filter.status = null;

    this.search(this.queueSearch);
  }

  changeMarkers(){
    this.mapController.changeQueues(this.openQueues);
  }

}
