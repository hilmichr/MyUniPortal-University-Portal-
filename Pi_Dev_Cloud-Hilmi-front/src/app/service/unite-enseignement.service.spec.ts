import { TestBed } from '@angular/core/testing';

import { UniteEnseignementService } from './unite-enseignement.service';

describe('UniteEnseignementService', () => {
  let service: UniteEnseignementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniteEnseignementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
