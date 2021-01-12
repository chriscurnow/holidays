import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysDetailComponent } from './holidays-detail.component';

describe('HolidaysDetailComponent', () => {
  let component: HolidaysDetailComponent;
  let fixture: ComponentFixture<HolidaysDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
