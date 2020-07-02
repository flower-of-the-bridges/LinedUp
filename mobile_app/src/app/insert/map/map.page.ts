import { Component, OnInit } from '@angular/core';
import { MapController } from 'src/component/controller/MapController';
import { GeoController } from 'src/component/controller/GeoController';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  private geoController: GeoController
  private mapController: MapController
  constructor(public loadingController: LoadingController, private geolocation: Geolocation, private authService: AuthService, private httpClient: HttpClient, private router: Router, public modalController: ModalController, public toastController: ToastController) {
    this.geoController = new GeoController(this.geolocation);
  }

  ionViewWillEnter() {
    this.presentLoading();
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

  ngOnInit() {

    this.authService.isLoggedIn().then((res: boolean) => {
      console.log("is logged in res %o", res);
      if (res) {
        let marker = null;

        this.geoController.getUserPosition().then(pos => {
          console.debug("my pos is : " + pos);
          if (pos) {
            this.mapController = new MapController('map_queue', pos, pos, this.httpClient, null);
            marker = this.mapController.addUser();
            this.mapController.getBuildings(this.modalController);
          }
        });
      }
    })
  }

  async showHelp() {
    const toast = await this.toastController.create({
      header: 'Need some help?',
      message: 'Double tap where the queue is located',
      position: 'top',
      buttons: [
        {
          text: '',
          icon: 'close-circle-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
