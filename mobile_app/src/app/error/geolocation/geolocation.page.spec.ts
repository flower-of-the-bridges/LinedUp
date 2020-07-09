import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeolocationPage } from './geolocation.page';

describe('GeolocationPage', () => {
  let component: GeolocationPage;
  let fixture: ComponentFixture<GeolocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
