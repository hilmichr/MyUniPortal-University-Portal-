import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifpasswordComponent } from './verifpassword.component';

describe('VerifpasswordComponent', () => {
  let component: VerifpasswordComponent;
  let fixture: ComponentFixture<VerifpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
