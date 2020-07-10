import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { Platform } from '@ionic/angular';
import { stringify } from 'querystring';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private university: string;
  private faculty: string;

  private password: string;

  private showPassword: boolean = false;
  private showConfirmedPassword: boolean = false;

  private isBrowser: boolean = true;

  private emailUsed: boolean = true;

  private passwordMatch: boolean = false;
  private isDateWrong: boolean = false;

  constructor(private authService: AuthService, private router: Router, private platform: Platform) { }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmedPassword(): void {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }


  ngOnInit() {

    this.isBrowser = !this.platform.is("cordova");

    /** receives university information from previous page */
    this.authService.hasUniversitySelected().subscribe(req => {
      if (req != null) {
        this.university = req.university;
        this.faculty = req.faculty;
      }
    })
  }

  checkMail(mail: string) {
    if (mail.match("[^@]+@[^@]+\.[a-zA-Z]{2,6}")) {
      this.authService.checkMail(mail).subscribe(res => {
        let domElement: HTMLElement = document.getElementById("mailerror");
        if (res.found == true) {
          this.emailUsed = true;
          console.log("found %s", res.found);
          domElement.innerHTML = "This email has already been used. Please enter a different one."
        }
        else {
          this.emailUsed = false;
          if (domElement.innerHTML != "") {
            domElement.innerHTML = "";
          }
        }
      });
    }
  }

  underAgeValidate(birthday: string) {
    // it will accept yyyy/mm/dd
    let oldBirthday = birthday.split("/");
    //set date based on birthday 
    let myBirthday = new Date(oldBirthday[1]+"/"+oldBirthday[0]+"/"+oldBirthday[2]);
    // set current day 
    let currentDate = new Date(new Date().toJSON().slice(0, 10) + ' 00:00:00');
    // calculate age comparing current date and borthday
    let myAge = ((currentDate.getTime() - myBirthday.getTime()) / 31557600000);
    return myAge >= 18;
  }

  checkDate(date: string){
    console.log("check date %s", date);
    if(date.match("(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.]((198|199)\\d|(2000|2001|2002))")){
      console.log("matches");
      if(!this.underAgeValidate(date)){
        document.getElementById("datecontent").innerHTML = "You must have 18 years old to use LinedUp"
        this.isDateWrong = true;
      }
      else{
        this.isDateWrong = false;
        if(document.getElementById("datecontent").innerHTML!=""){
          document.getElementById("datecontent").innerHTML = "";
        }
      }
    }
      
  }

  checkPassword(confirmedPassword: string) {
    let domElement: HTMLElement = document.getElementById("passerror");
    if (confirmedPassword != this.password) {
      this.passwordMatch = false;
      domElement.innerHTML = "Password do not match.";
    }
    else {
      this.passwordMatch = true;
      if (domElement.innerHTML != "") {
        domElement.innerHTML = "";
      }
    }
  }

  register(form: any, event: any) {
    if (document.getElementById("mailerror").innerHTML == "" && document.getElementById("passerror").innerHTML == "") {
      form.value["faculty"] = this.faculty;
      form.value["university"] = this.university;
      console.log("form is %o", form.value);
      this.authService.register(form.value).subscribe((res: any) => {

        if (res.access_token != null) {
          this.authService.authSubject.next(res.access_token);
          console.log("navigating");
          this.router.navigateByUrl('/home-auth');
        }
      });
    }
    else {
      event.preventDefault();
    }
  }

}