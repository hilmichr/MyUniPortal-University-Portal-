import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsListComponent } from './options-list.component';

describe('OptionsListComponent', () => {
  let component: OptionsListComponent;
  let fixture: ComponentFixture<OptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
