import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOptionComponent } from './create-option.component';

describe('CreateOptionComponent', () => {
  let component: CreateOptionComponent;
  let fixture: ComponentFixture<CreateOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
