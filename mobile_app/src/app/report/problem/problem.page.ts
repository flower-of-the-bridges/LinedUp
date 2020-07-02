import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.page.html',
  styleUrls: ['./problem.page.scss'],
})
export class ProblemPage implements OnInit {

  @Input() name: string = "";

  @Input() id: number;

  @Input() university: string = "";

  private genericProblem: boolean = false;

  private hoursProblem: boolean = false;

  private canReport: boolean = false;

  private reportSent: boolean = false;

  private openedDate: string = null;

  private closedDate: string = null;

  private description: string = "";

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log("Report Problem: %s ", this.name);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  setGenericProblem() {
    this.genericProblem = true;
    this.hoursProblem = false;
  }

  setHoursProblem() {
    this.hoursProblem = true;
    this.genericProblem = false;
  }

  setDescription(description: string) {
    this.description = description;
  }

  mainPage() {
    this.genericProblem = false;
    this.hoursProblem = false;
    this.openedDate = null;
    this.canReport = false;
  }

  setOpenedDate(date: string) {
    this.openedDate = date;
  }

  setClosedDate(date: string) {
    this.closedDate = date;
    this.canReport = true;
  }

  report(problem: string){
    console.log(problem);
    switch(problem){
      case "hours":
        break;
      case "generic":
        break;
    }
    this.genericProblem = false;
    this.hoursProblem = false;
    this.reportSent = true;
  }

}
