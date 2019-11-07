import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../models/token';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private localStorageService: LocalstorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: Token = this.localStorageService.getToken();
        if (token && request.url.includes('secured')) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${token.value}` } });
        }
        return next.handle(request);
    }

}
