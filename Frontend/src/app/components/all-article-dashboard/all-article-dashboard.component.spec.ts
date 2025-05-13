import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArticleDashboardComponent } from './all-article-dashboard.component';

describe('AllArticleDashboardComponent', () => {
  let component: AllArticleDashboardComponent;
  let fixture: ComponentFixture<AllArticleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllArticleDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllArticleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
