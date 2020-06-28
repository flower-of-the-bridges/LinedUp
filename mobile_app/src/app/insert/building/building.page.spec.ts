import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuildingPage } from './building.page';

describe('BuildingPage', () => {
  let component: BuildingPage;
  let fixture: ComponentFixture<BuildingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuildingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
