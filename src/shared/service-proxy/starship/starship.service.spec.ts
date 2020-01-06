/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StarshipService } from './starship.service';

describe('Service: Starship', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarshipService]
    });
  });

  it('should ...', inject([StarshipService], (service: StarshipService) => {
    expect(service).toBeTruthy();
  }));
});
