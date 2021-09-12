import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { mockUser } from '../../test/mock-data';
import { User } from '../../shared/model';

fdescribe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;
  const TOKEN_KEY = 'auth-token';
  const USER_KEY = 'auth-user';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorageService = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    const storage = {};

    spyOn(window.localStorage, 'getItem').and.callFake(
      (key: string) => storage[key]
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key: string, value: string) => (storage[key] = value)
    );
    spyOn(window.localStorage, 'removeItem').and.callFake((key: string) =>
      storage[key] !== undefined ? storage[key] : null
    );
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  it('should clear token and user basic info from local storage', () => {
    localStorageService.clear();

    expect(window.localStorage.removeItem).toHaveBeenCalledWith(TOKEN_KEY);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(USER_KEY);
  });

  it('should emit null user after clearing values from local storage', () => {
    localStorageService.userSubject.subscribe((user: User) =>
      expect(user).toBe(null)
    );
    localStorageService.clear();
  });

  it('should save token to local storage', () => {
    const token = 'abc123';
    localStorageService.saveToken(token);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(TOKEN_KEY, token);
  });

  it('should get token from local storage', () => {
    localStorageService.getToken();

    expect(window.localStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY);
  });

  it('should save user basic info to local storage', () => {
    localStorageService.saveUser(mockUser);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      USER_KEY,
      JSON.stringify(mockUser)
    );
  });

  it('should emit user after user saved to local storage', () => {
    localStorageService.saveUser(mockUser);
    localStorageService.userSubject.subscribe((user: User) =>
      expect(user).toEqual(mockUser)
    );
  });
});
