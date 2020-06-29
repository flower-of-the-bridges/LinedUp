import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { BuildingPage } from '../../building/building.page';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.page.html',
  styleUrls: ['./recap.page.scss'],
})
export class RecapPage implements OnInit {

  @Input() place: any;
  @Input() street: string;


  constructor(private authService: AuthService, private router: Router, public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.place, this.street);
  }

  selectPlace() {

    this.place && this.authService.setBuilding({
      building: {
        name: this.place.building,
        street: this.place.street
      },
      room: "",
      number: ""
    });
    this.street && this.authService.setBuilding({
      building:{
        name:"",
        street: this.street
      },
      room: "",
      number: ""
    });

    this.dismiss();
    this.router.navigateByUrl("insert/service");


  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
