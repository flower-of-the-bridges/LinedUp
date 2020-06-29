import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {

  private serviceSection: boolean = true;
  private request: any = {
    building: "",
    street: "",
    room: "",
    number: "",
    name: "",
    description: "",
    service: ""
  }
  private services: Array<string> = ["secretariat", "canteen", "office hours"];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getBuilding().subscribe(res => {
      console.log("building is %o", res);
      if (res) {
        this.request.building = res.building.name != "" ? res.building.name : "/";
        this.request.street = res.building.street != "" ? res.building.street : "/";
        this.request.room = res.room != "" ? res.room : "/";
        this.request.number = res.number != "" ? res.number : "/";
      }
    })
  }

  back() {
    if (!this.serviceSection) {
      this.serviceSection = true;
    }
  }

  review(service: any) {

    console.log(service);
    this.request.name = service.name;
    this.request.description = service.description;
    this.request.service = service.type;

    this.serviceSection = false;
  }

  insertQueue() {
    console.log("sending %o", this.request);
    this.authService.insertQueue(this.request).subscribe(res => {
      if (res && res.msg && res.msg == "ok") {
        this.router.navigateByUrl("/insert");
      }
    });
  }
}
