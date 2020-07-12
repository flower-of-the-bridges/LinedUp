import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'tutorial-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapTutorial implements OnInit {

  @Input() isTutorial: boolean;

  private university: string = "";
  private hideTutorial: boolean = false;
  constructor(private authService: AuthService, public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.isTutorial);
    this.authService.getUniversity().then(university => {
      this.university = university;
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    console.log("show tutorial is %s", this.hideTutorial);
    this.modalController.dismiss({
      'dismissed': true,
      'hideTutorial': this.hideTutorial
    });
  }

}
