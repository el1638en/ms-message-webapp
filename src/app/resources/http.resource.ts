import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  /**
   * Personnaliser les requête HTTP afin d'ajouter le header Json à toutes nos requêtes.
   */
export class HttpResource {

    constructor(private httpClient: HttpClient) {
    }

    get<T>(url: string, headers?: HttpHeaders): Observable<T> {
        return this.httpClient.get<T>(url, { headers: this.addContentTypeHeaders(headers) });
    }

    post<T>(url: string, object: T): Observable<T> {
        return this.httpClient.post<T>(url, object);
    }

    put<T>(url: string, object: T): Observable<T> {
        return this.httpClient.put<T>(url, object);
    }

    delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
        return this.httpClient.delete<T>(url, { headers: this.addContentTypeHeaders(headers) });
    }

    /**
     * Ajouter dans le header de la requete que le content-type est au format Json.
     * @param headers headers de la requete. Par défaut, si la méthode est appelée sans headers, on l'initialise.
     */
    private addContentTypeHeaders(headers: HttpHeaders = new HttpHeaders()): HttpHeaders {
        return headers.append('Content-Type', 'application/json');
    }
}
