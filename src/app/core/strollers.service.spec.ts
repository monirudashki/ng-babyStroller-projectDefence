import { TestBed } from '@angular/core/testing';

import { StrollersService } from './strollers.service';

describe('StrollersService', () => {
  let service: StrollersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrollersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
