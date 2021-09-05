import { TestBed } from '@angular/core/testing';

import { HttpRequestService } from './http-request.service';
import { HttpMethod } from './helpers/http-methods.helper';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HttpRequestService', () => {
  let httpRequestService: HttpRequestService;
  let httpMock: HttpTestingController;
  let dummyRoute = '/api/endpoint/1';

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpRequestService],
    });
    httpRequestService = TestBed.inject(HttpRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(httpRequestService).toBeTruthy();
  });

  describe('should be able to perform requests for', () => {

    it('GET method', () => {
      httpRequestService.perform(HttpMethod.GET, dummyRoute).subscribe();

      const testRequest = httpMock.match(httpRequestService.apiUrl + dummyRoute)[0];
      expect(testRequest.request.method).toBe('GET');
    });

    it('POST method', () => {
      const data = { id: 1, name: '' };
      httpRequestService.perform(HttpMethod.POST, dummyRoute, data).subscribe();

      const testRequest = httpMock.match(httpRequestService.apiUrl + dummyRoute)[0];
      expect(testRequest.request.method).toBe('POST');
    });

    it('PUT method', () => {
      const data = { id: 1, name: '' };
      httpRequestService.perform(HttpMethod.PUT, dummyRoute, data).subscribe();

      const testRequest = httpMock.match(httpRequestService.apiUrl + dummyRoute)[0];
      expect(testRequest.request.method).toBe('PUT');
    });

    it('PATCH method', () => {
      const data = { name: '' };
      httpRequestService.perform(HttpMethod.PATCH, dummyRoute, data).subscribe();

      const testRequest = httpMock.match(httpRequestService.apiUrl + dummyRoute)[0];
      expect(testRequest.request.method).toBe('PATCH');
    });

    it('DELETE method', () => {
      httpRequestService.perform(HttpMethod.DELETE, dummyRoute).subscribe();

      const testRequest = httpMock.match(httpRequestService.apiUrl + dummyRoute)[0];
      expect(testRequest.request.method).toBe('DELETE');
    });
  });

  describe('should throw error when body is null for', () => {
    const expectedErrMessage = 'Body parameter cannot be null on POST, PUT, or PATCH requests.';

    it('POST method', () => {
      expect(() =>
        httpRequestService.perform(HttpMethod.POST, dummyRoute, null)
      ).toThrow(new Error(expectedErrMessage));
    });

    it('PUT method', () => {
      expect(() =>
        httpRequestService.perform(HttpMethod.PUT, dummyRoute, null)
      ).toThrow(new Error(expectedErrMessage));
    });

    it('PATCH method', () => {
      expect(() =>
        httpRequestService.perform(HttpMethod.PATCH, dummyRoute, null)
      ).toThrow(new Error(expectedErrMessage));
    });
  });

  it('should throw error for unimplemented HTTP method', () => {
    const unimplementedMethod = 'CONNECT';
    const expectedErrMessage = 'HTTP method CONNECT has not been implemented.';

    expect(() =>
      // @ts-ignore
      httpRequestService.perform(unimplementedMethod, dummyRoute)
    ).toThrow(new Error(expectedErrMessage));
  });
});
