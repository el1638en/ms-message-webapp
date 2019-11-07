import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpResource } from './http.resource';

@Injectable({
    providedIn: 'root'
  })
export class RegisterResource {

    readonly API_URL = `${environment.apiUrl}/api/user`;

    constructor(private httpResource: HttpResource) {
    }

    /**
     * Appel HTTP vers le backend pour créer un nouvel utilisateur.
     * @param user utilisateur à créer.
     */
    create(user: User): Observable<User> {
        return this.httpResource.post<User>(`${this.API_URL}`, user);
    }
}
