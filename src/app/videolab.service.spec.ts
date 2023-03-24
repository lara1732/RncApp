import { TestBed } from '@angular/core/testing';

import { VideolabService } from './videolab.service';

describe('VideolabService', () => {
  let service: VideolabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideolabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
