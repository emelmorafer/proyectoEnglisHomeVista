import { TestBed } from '@angular/core/testing';

import { ClienteGeneralService } from './cliente-general.service';

describe('ClienteGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteGeneralService = TestBed.get(ClienteGeneralService);
    expect(service).toBeTruthy();
  });
});
