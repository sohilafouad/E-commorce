import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preventloginGuard } from './preventlogin.guard';

describe('preventloginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preventloginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
