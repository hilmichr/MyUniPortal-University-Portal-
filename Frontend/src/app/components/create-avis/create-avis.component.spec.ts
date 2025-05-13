import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAvisComponent } from './create-avis.component';

describe('CreateAvisComponent', () => {
  let component: CreateAvisComponent;
  let fixture: ComponentFixture<CreateAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAvisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
