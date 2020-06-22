import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return "<ion-input type='text'></ion-input>"
  }

  submit(evt){
    console.log(evt);
  }
}
