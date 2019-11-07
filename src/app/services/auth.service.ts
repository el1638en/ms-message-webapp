import { Injectable } from '@angular/core';
import { LoginResource } from '../resources/login.resource';
import { Observable } from 'rxjs';
import { Token } from '../models/token';
import { LocalstorageService } from './localstorage.service';
import { includes } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private loginResource: LoginResource, private localStorageService: LocalstorageService) {
  }

  login(mail: string, password: string): Observable<Token> {
    return this.loginResource.login(mail, password);
  }

  isAuthenticated(): boolean {
    const token: Token = this.localStorageService.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  isAuthorized(allowedRoles: string[]): boolean {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    const token: Token = this.getToken();
    if (!token.fonctions || token.fonctions.length === 0) {
      return false;
    }
    for (const fonction of token.fonctions) {
      if (includes(allowedRoles, fonction.code)) {
        return true;
      }
    }
  }

  getToken(): Token {
    return this.localStorageService.getToken();
  }

  logout(): void {
    this.localStorageService.removeToken();
  }
}
