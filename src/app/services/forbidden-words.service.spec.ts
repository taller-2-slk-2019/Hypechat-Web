import { TestBed } from '@angular/core/testing';

import { ForbiddenWordsService } from './forbidden-words.service';

describe('ForbiddenWordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForbiddenWordsService = TestBed.get(ForbiddenWordsService);
    expect(service).toBeTruthy();
  });
});
