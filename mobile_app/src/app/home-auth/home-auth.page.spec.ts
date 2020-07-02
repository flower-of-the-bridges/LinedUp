import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeAuthPage } from './home-auth.page';

describe('HomeAuthPage', () => {
  let component: HomeAuthPage;
  let fixture: ComponentFixture<HomeAuthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAuthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
