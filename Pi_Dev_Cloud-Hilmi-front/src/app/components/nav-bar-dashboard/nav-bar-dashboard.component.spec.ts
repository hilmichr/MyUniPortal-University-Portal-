import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarDashboardComponent } from './nav-bar-dashboard.component';

describe('NavBarDashboardComponent', () => {
  let component: NavBarDashboardComponent;
  let fixture: ComponentFixture<NavBarDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
