import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUeComponent } from './update-ue.component';

describe('UpdateUeComponent', () => {
  let component: UpdateUeComponent;
  let fixture: ComponentFixture<UpdateUeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
