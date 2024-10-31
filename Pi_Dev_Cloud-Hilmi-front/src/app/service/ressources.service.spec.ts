import { TestBed } from '@angular/core/testing';

import { RessourcesService } from './ressources.service';

describe('RessourcesService', () => {
  let service: RessourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RessourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
