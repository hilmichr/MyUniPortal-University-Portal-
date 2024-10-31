import { TestBed } from '@angular/core/testing';

import { RendezvousService } from './rendezvous.service';

describe('RendezvousService', () => {
  let service: RendezvousService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendezvousService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
