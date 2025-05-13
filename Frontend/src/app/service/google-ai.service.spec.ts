import { TestBed } from '@angular/core/testing';

import { GoogleAiService } from './google-ai.service';

describe('GoogleAiService', () => {
  let service: GoogleAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
