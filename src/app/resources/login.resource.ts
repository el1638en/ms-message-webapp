import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token';
import { HttpResource } from './http.resource';

@Injectable({
    providedIn: 'root'
  })
export class LoginResource {

    readonly API_URL = `${environment.apiUrl}/api/login`;

    constructor(private httpResource: HttpResource) {
    }

    /**
     * Authentification de l'utilisateur (mail & mot de passe) auprès du back-end.
     * @param mail mail de l'utilisateur.
     * @param password mot de passe de l'utilisateur.
     */
    login(mail: string, password: string): Observable<Token> {
        const requestHeaders = new HttpHeaders().append('Authorization', 'Basic ' + btoa(`${mail}:${password}`));
        return this.httpResource.get<Token>(`${this.API_URL}`, requestHeaders);
    }
}
