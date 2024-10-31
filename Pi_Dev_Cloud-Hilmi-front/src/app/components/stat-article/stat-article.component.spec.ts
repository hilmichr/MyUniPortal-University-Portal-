import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatArticleComponent } from './stat-article.component';

describe('StatArticleComponent', () => {
  let component: StatArticleComponent;
  let fixture: ComponentFixture<StatArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
