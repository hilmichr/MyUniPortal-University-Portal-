import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementDetailsComponent } from './evenement-details.component';

describe('EvenementDetailsComponent', () => {
  let component: EvenementDetailsComponent;
  let fixture: ComponentFixture<EvenementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
