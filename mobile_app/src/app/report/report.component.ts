import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProblemPage } from './problem/problem.page';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  @Input() name: string = "";
  @Input() street: string = "";
  @Input() status: boolean = false;
  @Input() isNear: boolean = false;
  @Input() isFavourite: string = "star-outlined";
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this);
  }

  async problemModal() {
    const modal = await this.modalController.create({
      component: ProblemPage,
      componentProps: {
        "name": this.name
      }
    });
    return await modal.present();
  }
  

}
