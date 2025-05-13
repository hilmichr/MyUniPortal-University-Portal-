import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsListDashboardComponent } from './options-list-dashboard.component';

describe('OptionsListDashboardComponent', () => {
  let component: OptionsListDashboardComponent;
  let fixture: ComponentFixture<OptionsListDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsListDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsListDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
