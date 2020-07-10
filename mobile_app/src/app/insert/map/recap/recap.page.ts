import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.page.html',
  styleUrls: ['./recap.page.scss'],
})
export class RecapPage implements OnInit {

  @Input() place: any;
  @Input() street: string;
  @Input() position: any;

  private building: string = null;


  constructor(private authService: AuthService, private router: Router, public modalController: ModalController) { }

  ngOnInit() {
    if(this.place){
      this.street = this.place.street;
      this.building = this.place.building;
    }
    console.log(this.place, this.building, this.street, this.position);
  }

  selectPlace(form: any) {

    this.authService.setBuilding({
      building: {
        name: this.building,
        street: this.street,
        position: this.position
      },
      room: form.room || "",
      number: form.number || ""
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

  
  setBuilding(building: string){
    this.building = building;
  }

}
