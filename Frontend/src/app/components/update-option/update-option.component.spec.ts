import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOptionComponent } from './UpdateOptionComponent';

describe('UpdateOptionComponent', () => {
  let component: UpdateOptionComponent;
  let fixture: ComponentFixture<UpdateOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
