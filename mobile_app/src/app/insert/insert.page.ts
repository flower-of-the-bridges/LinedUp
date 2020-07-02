import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {

  constructor(private authService: AuthService, public modalController: ModalController) { }

  ngOnInit() {
    this.authService.getUniversity().then(university => {
      this.authService.insertSubject.asObservable().subscribe(msg => {
        if (msg) {
          this.insertModal(university);
        }
      })
    });
  }

  async insertModal(university) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        "university": university
      }
    });
    return await modal.present();
  }

}
