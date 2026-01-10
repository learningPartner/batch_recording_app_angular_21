import { TestBed } from '@angular/core/testing';

import { EnrollentService } from './enrollent-service';

describe('EnrollentService', () => {
  let service: EnrollentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
