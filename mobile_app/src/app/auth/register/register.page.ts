import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private university: string;
  private faculty: string;

  private showPassword: boolean = false;
  private showConfirmedPassword: boolean = false;

  private isBrowser: boolean = true;

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

  register(form: any) {
    form.value["faculty"] = this.faculty;
    form.value["university"] = this.university;
    console.log("form is %o", form.value);
    this.authService.register(form.value).subscribe((res: any) => {

      if (res.access_token!=null) {
        this.authService.authSubject.next(res.access_token);
        console.log("navigating");
        this.router.navigateByUrl('/home-auth');
      }
    });
  }

}