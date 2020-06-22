import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-university',
  templateUrl: './university.page.html',
  styleUrls: ['./university.page.scss'],
})
export class UniversityPage implements OnInit {

  private university: string;
  private universities: Array<string>;
  private faculties: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUniversities().subscribe(res => {

      this.universities = Object.keys(res);
      this.faculties = res;
      console.log("%o %o", this.universities, this.faculties);
    })
  }

  addUniversity(form) {
    this.authService.addUniversities(form.value);
    this.router.navigateByUrl('register');
  }

  selectUniversity(value: string) {
    this.university = value;
  }

}
