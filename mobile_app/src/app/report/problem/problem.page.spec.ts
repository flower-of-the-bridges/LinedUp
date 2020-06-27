import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProblemPage } from './problem.page';

describe('ProblemPage', () => {
  let component: ProblemPage;
  let fixture: ComponentFixture<ProblemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
