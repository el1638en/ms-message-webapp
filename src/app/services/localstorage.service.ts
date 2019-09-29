import { Injectable } from '@angular/core';
import { Token } from '../models/token';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  readonly TOKEN: string = 'TOKEN';

  constructor(private logger: NGXLogger) {}

  /**
   * Enregistrer un token dans le localStorage.
   * @param token jeton à enregistrer
   */
  saveToken(token: Token) {
    this.logger.info(`Save token in the localstorage for user : ${token.userName} ${token.userFirstName}.`);
    localStorage.setItem(this.TOKEN, JSON.stringify(token));
  }

  /**
   * Acceder au token
   */
  getToken(): Token {
    const tokenStorage = localStorage.getItem(this.TOKEN);
    if (tokenStorage) {
      return JSON.parse(tokenStorage);
    }
    return null;
  }

  /**
   * Supprimer le token
   */
  removeToken(): void {
    this.logger.info(`Remove token in the localstorage.`);
    localStorage.removeItem(this.TOKEN);
  }
}
