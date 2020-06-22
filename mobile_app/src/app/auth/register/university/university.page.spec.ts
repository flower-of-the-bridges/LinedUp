import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UniversityPage } from './university.page';

describe('UniversityPage', () => {
  let component: UniversityPage;
  let fixture: ComponentFixture<UniversityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UniversityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
