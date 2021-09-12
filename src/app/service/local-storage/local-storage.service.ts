import { Injectable } from '@angular/core';
import { User } from '../../shared/model';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  userSubject: BehaviorSubject<User>;

  constructor() {
    const userStr = window.localStorage.getItem(USER_KEY);
    if (!userStr) {
      this.userSubject = new BehaviorSubject<User>(null);
    } else {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(userStr));
    }
  }

  public clear(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    this.emitUser();
  }

  public saveToken(token: string): void {
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User): void {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.emitUser();
  }

  private emitUser(): void {
    const user = window.localStorage.getItem(USER_KEY) || null;
    this.userSubject.next(JSON.parse(user));
  }
}