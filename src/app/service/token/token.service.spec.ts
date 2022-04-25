import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let tokenService: TokenService;
  const token = 'ABC123';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tokenService = TestBed.inject(TokenService);
  });

  beforeEach(() => {
    const storage = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => storage[key]);
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => (storage[key] = value)
    );
    spyOn(localStorage, 'removeItem').and.callFake((key: string) =>
      storage[key] !== undefined ? storage[key] : null
    );
    localStorage.setItem('authState', JSON.stringify({ userState: { token } }));
  });

  it('should be created', () => {
    expect(tokenService).toBeTruthy();
  });

  it('should get token from local storage', () => {
    const actualToken = tokenService.getToken();

    expect(actualToken).toEqual(token);
  });
});
