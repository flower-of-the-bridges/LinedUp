import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private showPassword = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(form: any) {
    this.authService.login(form.value).subscribe((res: any) => {
      
      if (res.access_token!=null) {
        this.authService.authSubject.next(res.access_token);
        console.log("navigating");
        this.router.navigateByUrl('/home-auth');
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}