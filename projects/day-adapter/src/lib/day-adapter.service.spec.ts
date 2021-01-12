import { TestBed } from '@angular/core/testing';

import { DayAdapterService } from './day-adapter.service';

describe('DayAdapterService', () => {
  let service: DayAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
