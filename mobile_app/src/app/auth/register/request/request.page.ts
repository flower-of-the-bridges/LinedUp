import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  private insertedUniversity: string = null;

  private university: string = null;

  private selectedFaculty: string = null;

  private insertedFaculty: string = null;

  private faculties: Array<string> = [];

  private enterFaculty: boolean = false;

  constructor(private authService: AuthService, private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    this.authService.getSelectedUniversity().subscribe(university => {
      this.insertedUniversity = university;
      this.authService.getUniversities().subscribe(res => {

        this.faculties = res[Object.keys(res)[0]].faculties;
        console.log("%o %o", this.faculties);
      })
    })
  }

  send() {
    let request = {
      university: this.insertedUniversity || this.university,
      isNewUniversity: this.insertedUniversity == null,
      faculty: this.selectedFaculty || this.insertedFaculty,
      isNewFaculty: this.selectedFaculty == null,
    }

    console.log("sending req %o", request);
    this.authService.sendUniversityRequest(request).subscribe(res => {
      if (res && res.msg && res.msg == "ok") {
        this.showModal();
      }
    })
  }

  async showModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
    });

    modal.onDidDismiss().then(() => {
      this.router.navigateByUrl("/home");
    })
    return await modal.present();
  }

}
