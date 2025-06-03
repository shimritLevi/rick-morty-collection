import { TestBed } from '@angular/core/testing';

import { MarkdownService } from './markdown.service';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';

describe('MarkdownService', () => {
  let service: MarkdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(MarkdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
