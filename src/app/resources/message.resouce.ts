import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
import { HttpResource } from './http.resource';

@Injectable({
    providedIn: 'root'
  })
export class MessageResource {

    readonly API_URL = `${environment.apiUrl}/api/secured/message`;

    constructor(private httpResource: HttpResource) {
    }

    create(message: Message): Observable<Message> {
        return this.httpResource.post<Message>(`${this.API_URL}`, message);
    }

    update(message: Message): Observable<Message> {
        return this.httpResource.put<Message>(`${this.API_URL}/${message.id}`, message);
    }

    findById(id: number): Observable<Message> {
        return this.httpResource.get<Message>(`${this.API_URL}/${id}`);
    }


    delete(id: number): Observable<Message> {
        return this.httpResource.delete<Message>(`${this.API_URL}/${id}`);
    }

    getAll(): Observable<Message[]> {
        return this.httpResource.get<Message[]>(`${this.API_URL}`);
    }
}

