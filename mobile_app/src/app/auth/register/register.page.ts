import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private university: string;
  private faculty: string;
  
  showPassword=false;
  passwordtoggleicon='eye';
  
  constructor(private authService: AuthService, private router: Router) { }
  
  togglePassword():void{
    this.showPassword = !this.showPassword;
    if(this.passwordtoggleicon == 'eye'){
      this.passwordtoggleicon='eye-off';
    }else{
      this.passwordtoggleicon = 'eye';
    }
  }


  ngOnInit() {
    /** receives university information from previous page */
    this.authService.hasUniversitySelected().subscribe(req => {
      if (req != null) {
        this.university = req.university;
        this.faculty = req.faculty;
      }
    })
  }

  register(form) {
    form.value["faculty"] = this.faculty;
    form.value["university"] = this.university;
    console.log("form is %o", form.value);
    this.authService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }

}