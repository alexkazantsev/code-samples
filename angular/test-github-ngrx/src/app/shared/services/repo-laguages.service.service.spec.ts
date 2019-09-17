import { TestBed } from '@angular/core/testing';

import { RepoLanguagesService } from './repo-laguages.service.service';

describe('RepoLaguages.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepoLanguagesService = TestBed.get(RepoLanguagesService);
    expect(service).toBeTruthy();
  });
});
