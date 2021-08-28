import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let tokenStorageService: TokenStorageService;
  const dummyUser = {
    email: 'user@example.com',
    firstName: 'first',
    lastName: 'last',
    address: null,
  }
  const TOKEN_KEY = 'auth-token';
  const USER_KEY = 'auth-user';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tokenStorageService = TestBed.inject(TokenStorageService);
  });

  beforeEach(() => {

    const store = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => store[key]);
    spyOn(window.localStorage, 'setItem').and.callFake((key: string, value: string) => store[key] = value);
    spyOn(window.localStorage, 'removeItem').and.callFake((key: string) => store[key] !== undefined ? store[key] : null);
  })

  it('should be created', () => {
    expect(tokenStorageService).toBeTruthy();
  });

  it('should clear token and user basic info from local storage when signing out', () => {
    tokenStorageService.signOut();

    expect(window.localStorage.removeItem).toHaveBeenCalledWith(TOKEN_KEY);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(USER_KEY);
  });

  it('should save token to local storage', () => {
    const token = 'abc123';
    tokenStorageService.saveToken(token);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(TOKEN_KEY, token);
  })

  it('should get token from local storage', () => {
    tokenStorageService.getToken();

    expect(window.localStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY);
  });

  it('should save user basic info to local storage', () => {
    tokenStorageService.saveUser(dummyUser);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(USER_KEY, JSON.stringify(dummyUser));
  });

  it('should get user basic info from local storage', () => {
    tokenStorageService.getUser();

    expect(window.localStorage.getItem).toHaveBeenCalledWith(USER_KEY);
  });

  it('should remove any prior user info before saving new user to local storage', () => {
    window.localStorage.setItem(USER_KEY, JSON.stringify(dummyUser));
    const dummyUser2 = {
      email: 'user2@example.com',
      firstName: 'first',
      lastName: 'last',
      address: null,
    }

    tokenStorageService.saveUser(dummyUser2);

    expect(window.localStorage.getItem(USER_KEY)).toEqual(JSON.stringify(dummyUser2));
  })
});
