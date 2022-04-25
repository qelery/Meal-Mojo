import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public getToken(): string | null {
    const authState = JSON.parse(localStorage.getItem('authState'));
    return authState.userState.token;
  }
}
