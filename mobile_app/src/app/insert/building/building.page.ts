import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building',
  templateUrl: './building.page.html',
  styleUrls: ['./building.page.scss'],
})
export class BuildingPage implements OnInit {

  private buildings: Array<any> = [];
  private building: any;
  private buildingSection: boolean = true;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUniversity().then(university => {
      this.authService.getUniversities().subscribe(res => {
        res[university].places.forEach((place: any, index: number) => {
          !place.building.includes("Room") && this.buildings.push({ id: place.id, name: place.building, street: place.street, position: place.position, index: index });
        });
        console.log(this.buildings);
      })
    });
  }

  selectBuilding(building: any) {
    console.log(building);
    this.building = building;
    this.buildingSection = false;
  }

  back() {
    if (this.buildingSection) {
      this.router.navigateByUrl("/insert");
    }
    else {
      this.buildingSection = true;
    }
  }

  confirm(form: any) {
    console.log(form.value);
    this.authService.setBuilding({
      building: this.building,
      room: form.value.room || "",
      number: form.value.number || ""
    });
    this.router.navigateByUrl("/insert/service");
  }

}
