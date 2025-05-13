import { TestBed } from '@angular/core/testing';

import { StatJChartserviceService } from './stat-jchartservice.service';

describe('StatJChartserviceService', () => {
  let service: StatJChartserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatJChartserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
