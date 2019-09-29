import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SnackBarService } from '../services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private snackBarService: SnackBarService,
                private router: Router,
                private translateService: TranslateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else { // HttpErrorResponse
                    switch (error.status) {
                        case 400: // BadRequest
                            this.snackBarService.openSnackBar(`${error.error.message}`);
                            break;
                        case 401: // Unauthorized
                            this.snackBarService.openSnackBar(this.translateService.instant('login.failed'));
                            this.router.navigateByUrl('/login');
                            break;
                        case 403: // Forbidden
                            this.router.navigateByUrl('/unauthorized');
                            break;
                        case 404: // NotFound
                            this.router.navigateByUrl('/notFound');
                            break;
                        default:
                            // Internal error
                            this.snackBarService.openSnackBar(this.translateService.instant('error.internal'));
                            break;
                    }
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
                }
                return throwError(errorMessage);
            })
        );
    }

}
