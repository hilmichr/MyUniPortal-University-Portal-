import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionDetailsComponent } from './option-details.component';

describe('OptionDetailsComponent', () => {
  let component: OptionDetailsComponent;
  let fixture: ComponentFixture<OptionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
