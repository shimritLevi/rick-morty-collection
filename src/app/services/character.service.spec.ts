import { TestBed } from '@angular/core/testing';
import { CharacterService } from './character.service';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';


describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CharacterService, provideHttpClientTesting()],
  });
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
