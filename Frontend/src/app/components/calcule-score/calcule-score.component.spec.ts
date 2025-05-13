import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculeScoreComponent } from './calcule-score.component';

describe('CalculeScoreComponent', () => {
  let component: CalculeScoreComponent;
  let fixture: ComponentFixture<CalculeScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculeScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculeScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
