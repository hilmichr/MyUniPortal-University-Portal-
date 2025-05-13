import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAllBackComponent } from './template-all-back.component';

describe('TemplateAllBackComponent', () => {
  let component: TemplateAllBackComponent;
  let fixture: ComponentFixture<TemplateAllBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateAllBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateAllBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
