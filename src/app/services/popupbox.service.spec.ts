import { TestBed } from '@angular/core/testing';

import { PopupboxService } from './popupbox.service';

describe('PopupboxService', () => {
  let service: PopupboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
