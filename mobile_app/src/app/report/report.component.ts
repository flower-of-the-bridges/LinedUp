import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProblemPage } from './problem/problem.page';
import { QueuePage } from './queue/queue.page';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

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
  @Input() isFavourite: boolean = false;
  @Input() hasNews: boolean = false;

  private interval: any = null;

  constructor(private ref: ChangeDetectorRef, private router: Router, private authService: AuthService, public modalController: ModalController) {
    ref.detach();
    this.interval = setInterval(() => {
      this.ref.detectChanges();
    }, 500);
  }

  ngOnInit() {
    this.authService.getFavourites().then(favourites => {
      favourites != null && favourites.forEach(favourite => {
        if (favourite == this.name) {
          this.isFavourite = true;
        }
      })
      clearInterval(this.interval);
      this.ref.reattach();
    })
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

  async queueModal() {
    const modal = await this.modalController.create({
      component: QueuePage,
      componentProps: {
        "name": this.name,
        "street": this.street,
        "status": this.status
      }
    });
    return await modal.present();
  }

  addToFavourites() {
    this.isFavourite = !this.isFavourite;
    this.authService.addToFavourites(this.name);
  }

  goToNews(){
    this.router.navigateByUrl("/news");
  }

}
