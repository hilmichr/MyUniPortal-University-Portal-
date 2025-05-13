import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservComponent } from './create-reserv.component';

describe('CreateReservComponent', () => {
  let component: CreateReservComponent;
  let fixture: ComponentFixture<CreateReservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReservComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
