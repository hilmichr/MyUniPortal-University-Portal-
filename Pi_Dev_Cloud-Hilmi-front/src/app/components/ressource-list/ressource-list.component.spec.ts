import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceListComponent } from './ressource-list.component';

describe('RessourceListComponent', () => {
  let component: RessourceListComponent;
  let fixture: ComponentFixture<RessourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
