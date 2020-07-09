import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {

  @Input() code: number;
  private isUserError: boolean = false;

  constructor(public modalController : ModalController) { }

  ngOnInit() {
    switch(this.code){
      case 1:
        this.isUserError = true;
        break;
    }
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
