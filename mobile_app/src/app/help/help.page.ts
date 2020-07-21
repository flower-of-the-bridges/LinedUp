import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  private university: string = null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUniversity().then(university => {
      this.university = university;
    });
  }

}
