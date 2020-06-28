import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QueuePage } from './queue.page';

describe('QueuePage', () => {
  let component: QueuePage;
  let fixture: ComponentFixture<QueuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QueuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
