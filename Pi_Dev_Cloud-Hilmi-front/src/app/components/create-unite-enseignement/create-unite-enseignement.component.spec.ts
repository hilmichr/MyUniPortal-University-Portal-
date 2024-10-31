import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUniteEnseignementComponent } from './create-unite-enseignement.component';

describe('CreateUniteEnseignementComponent', () => {
  let component: CreateUniteEnseignementComponent;
  let fixture: ComponentFixture<CreateUniteEnseignementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUniteEnseignementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUniteEnseignementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
