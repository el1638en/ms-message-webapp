import { NgModule } from '@angular/core';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/tokenInterceptor';
import { HttpErrorInterceptor } from './interceptors/httpErrorInterceptor';


@NgModule({
    imports: [],
    exports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        }
    ]
}) export class TokenInterceptorModule { }
