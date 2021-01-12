import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAdapterComponent } from './day-adapter.component';

describe('DayAdapterComponent', () => {
  let component: DayAdapterComponent;
  let fixture: ComponentFixture<DayAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
