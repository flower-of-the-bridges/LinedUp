import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { report } from 'process';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.page.html',
  styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit {

  @Input() id: number;
  @Input() university: string;
  @Input() name: string;
  @Input() street: string;
  @Input() hours: string;

  private review: boolean = false;
  private reportSent: boolean = false;

  private numberOfPersons: any = {
    "< 10": "Less than 10",
    "10 - 20": "Between 10 and 20",
    "20 - 40": "Between 20 and 40",
    "40 >": "More than 40"
  };
  private numberOfPersonsKeys: Array<string> = Object.keys(this.numberOfPersons);
  private personChips: any = {};
  private numberOfPersonsSelected: string = null;

  private estimatedTime: any = {
    "< 5": "At most 5 minutes",
    "5 - 10": "Between 5 and 10 minutes",
    "10 - 30": "Between 10 and 30 minutes",
    "30 - 60": "Between 30 and 60 minutes",
    "60 >": "More than 60 minutes"
  };
  private estimatedTimeKeys: Array<string> = Object.keys(this.estimatedTime);
  private timeChips: any = {};
  private estimatedTimeSelected: string = null;

  private queueSpeed: number = 1;
  private requestResult: any = null;

  private experiment: boolean = false;//false;
  private timer: number;

  private request = {
    persons: null,
    time: null,
    speed: 1
  }

  constructor(private authService: AuthService, public modalController: ModalController) { }

  ngOnInit() {
    console.log("Report Queue: %s ", this.name);
    this.timer = Date.now();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      requestResult: this.requestResult
    });
  }

  selectNumberOfPersons(chip: any) {
    let persons = this.select(chip, this.personChips);

    this.request.persons = persons;
    this.numberOfPersonsSelected = this.numberOfPersons[persons];
    console.log(this.numberOfPersonsSelected);
  }

  selectEstimatedTime(chip: any) {
    let time = this.select(chip, this.timeChips);

    this.request.time = time;
    this.estimatedTimeSelected = this.estimatedTime[time];
    console.log(this.selectEstimatedTime);
  }
  select(chip: any, chipContainer: any) {
    let outline = !chip.el.getAttribute("outline");

    chip.el.setAttribute("outline", chip.el.getAttribute("outline") == "" ? "false" : outline);

    if (!chipContainer[chip.el.getAttribute("id")]) {
      chipContainer[chip.el.getAttribute("id")] = chip.el;
    }

    Object.keys(chipContainer).forEach(chipId => {
      let storedChip = chipContainer[chipId];
      if (storedChip.getAttribute("id") != chip.el.getAttribute("id") && storedChip.getAttribute("outline") == "false") {
        storedChip.setAttribute("outline", "true");
      }
    });

    return chip.el.textContent;
  }

  setSpeed(speed: number) {
    this.queueSpeed = speed;
  }

  reviewSection() {
    this.review = true;
  }

  mainPage() {
    this.review = false;
    console.log(this.personChips, this.timeChips);
    this.request.persons && Object.keys(this.personChips).forEach(chipIndex => {
      let chip = this.personChips[chipIndex];
      console.log(chip);
      if (this.request.persons == chip.textContent) {
        let domChip = document.getElementById(chip.id);
        chip.setAttribute("outline", "false");
        console.log("changed");
      }
    })
  }

  sendReview() {
    this.reportSent = true;
    this.review = false;
    this.request["university"] = this.university;
    this.request["ts"] = Date.now();
    this.authService.sendReview({ id: this.id, request: this.request }).subscribe(res => {
      this.requestResult = res;
      this.timer = Date.now() - this.timer;
      console.info("Interface %d running time: %d ms", this.experiment ? 2 : 1, this.timer);
    })
  }
}
