import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAllFrontComponent } from './template-all-front.component';

describe('TemplateAllFrontComponent', () => {
  let component: TemplateAllFrontComponent;
  let fixture: ComponentFixture<TemplateAllFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateAllFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateAllFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
