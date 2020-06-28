import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { report } from 'process';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.page.html',
  styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit {

  @Input() name: string;
  @Input() street: string;
  @Input() status: boolean;
  
  private review: boolean = false;
  private reportSent: boolean = false;

  private numberOfPersons: any = {
    "< 10": "Less than 10", 
    "10 - 20": "Between 10 and 20",
    "20 - 40": "Between 20 and 40",
    "40 >": "More than 40"
  };
  private numberOfPersonsKeys: Array<string> = Object.keys(this.numberOfPersons);
  private personChips: Array<any> = [];
  private numberOfPersonsSelected: string = null;

  private estimatedTime: any = {
    "< 5": "At most 5 minutes",
    "5 - 10": "Between 5 and 10 minutes", 
    "10 - 30": "Between 10 and 30 minutes",
    "30 - 60": "Between 30 and 60 minutes",
    "60 >": "More than 60 minutes"};
  private estimatedTimeKeys: Array<string> = Object.keys(this.estimatedTime); 
  private timeChips: Array<any> = [];
  private estimatedTimeSelected: string = null;

  private queueSpeed: string = "Slow";

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log("Report Queue: %s ", this.name);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  selectNumberOfPersons(chip: any){
    this.numberOfPersonsSelected = this.numberOfPersons[this.select(chip, "person", this.personChips)];
  }

  selectEstimatedTime(chip: any){
    this.estimatedTimeSelected = this.estimatedTime[this.select(chip, "time", this.timeChips)];
  }
  select(chip: any, type: string, chipArray: Array<any>) {
    let outline = !chip.el.getAttribute("outline");

    chip.el.setAttribute("outline", chip.el.getAttribute("outline") == "" ? "false" : outline);

    if(!chip.el.getAttribute("id")){
      chip.el.setAttribute("id", type+chipArray.length);
      chipArray.push(chip.el);
    }

    chipArray.forEach(personChip => {
      if (personChip.getAttribute("id") != chip.el.getAttribute("id") && personChip.getAttribute("outline")=="false") {
        personChip.setAttribute("outline", "true");
      }
    });

    return chip.el.textContent;
  }

  setSpeed(speed: number){
    this.queueSpeed = speed == 1 ? "Slow" : (speed == 2 ? "Medium" : "Fast");
  }

  reviewSection(){
    this.review = true;
  }

  mainPage(){
    this.estimatedTimeSelected = null;
    this.numberOfPersonsSelected = null;
    this.review = false;
  }

  sendReview(){
    this.reportSent = true;
    this.review = false;
  }
}
