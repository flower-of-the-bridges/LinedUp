import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-university',
  templateUrl: './university.page.html',
  styleUrls: ['./university.page.scss'],
})
export class UniversityPage implements OnInit {

  private university: string;
  private universities: Array<string> = [];
  private isGoogleAuth: string = null;
  private faculties: any;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isGoogleAuthentication().subscribe(res => {
      this.isGoogleAuth = res;
    })
    this.authService.getUniversities().subscribe(res => {

      this.universities = Object.keys(res);
      this.faculties = res;
      console.log("%o %o", this.universities, this.faculties);
    })
  }

  addUniversity(form: any) {
    if (this.isGoogleAuth == null) {
      this.authService.addUniversities(form.value);
      this.router.navigateByUrl('register');
    }
    else{
      this.authService.finishGoogleRegistration(this.isGoogleAuth, form.value.university, form.value.faculty).subscribe(res => {
        res && res.msg && res.msg == "ok" && this.router.navigateByUrl('/home-auth');
      });
    }
  }

  selectUniversity(value: string) {
    this.university = value;
    this.authService.setSelectedUniversity(this.university);
  }

}
