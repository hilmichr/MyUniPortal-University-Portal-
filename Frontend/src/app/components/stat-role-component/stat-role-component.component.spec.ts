import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatRoleComponentComponent } from './stat-role-component.component';

describe('StatRoleComponentComponent', () => {
  let component: StatRoleComponentComponent;
  let fixture: ComponentFixture<StatRoleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatRoleComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatRoleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
