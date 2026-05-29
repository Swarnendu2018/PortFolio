import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiServiceService } from './api-service.service';
import { environment } from 'src/environments/environment';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request profile data from the API', () => {
    const mockProfiles = [
      { name: 'Swarnendu Gharami', email: 'test@example.com', phone: '1234567890' }
    ];

    service.getData().subscribe((profiles) => {
      expect(profiles).toEqual(mockProfiles);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/profile`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfiles);
  });
});
