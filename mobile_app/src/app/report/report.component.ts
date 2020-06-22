import { Component, OnInit, Input } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
    console.log(this);
  }

}
