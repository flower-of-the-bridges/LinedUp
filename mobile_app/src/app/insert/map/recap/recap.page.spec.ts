import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecapPage } from './recap.page';

describe('RecapPage', () => {
  let component: RecapPage;
  let fixture: ComponentFixture<RecapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
