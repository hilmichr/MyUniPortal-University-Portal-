import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceComponent } from './update-service.component';

describe('UpdateServiceComponent', () => {
  let component: UpdateServiceComponent;
  let fixture: ComponentFixture<UpdateServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
