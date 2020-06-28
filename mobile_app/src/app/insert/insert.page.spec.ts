import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsertPage } from './insert.page';

describe('InsertPage', () => {
  let component: InsertPage;
  let fixture: ComponentFixture<InsertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
