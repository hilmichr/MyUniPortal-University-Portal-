import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventComponent } from './update-event.component';

describe('UpdateEventComponent', () => {
  let component: UpdateEventComponent;
  let fixture: ComponentFixture<UpdateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
