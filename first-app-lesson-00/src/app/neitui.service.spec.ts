import { TestBed } from '@angular/core/testing';

import { NeituiService } from './neitui.service';

describe('NeituiService', () => {
  let service: NeituiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeituiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
