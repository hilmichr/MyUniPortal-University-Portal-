import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRessourceComponent } from './add-ressource.component';

describe('AddRessourceComponent', () => {
  let component: AddRessourceComponent;
  let fixture: ComponentFixture<AddRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRessourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
