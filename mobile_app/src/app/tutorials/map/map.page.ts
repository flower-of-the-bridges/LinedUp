import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'tutorial-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapTutorial implements OnInit {

  @Input() isTutorial: boolean;
  private hideTutorial: boolean = false;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.isTutorial);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    console.log("show tutorial is %s", this.hideTutorial );
    this.modalController.dismiss({
      'dismissed': true,
      'hideTutorial': this.hideTutorial
    });
  }

}
