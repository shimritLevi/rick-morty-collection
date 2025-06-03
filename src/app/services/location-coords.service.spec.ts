import {LocationCoordsService} from './location-coords.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';

describe('LocationCoordsService', () => {
  let service: LocationCoordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [LocationCoordsService, provideHttpClientTesting()],
  });
    service = TestBed.inject(LocationCoordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
