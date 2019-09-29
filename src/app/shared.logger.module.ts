import { NgModule } from '@angular/core';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';


@NgModule({
    imports: [
        LoggerModule.forRoot({
            serverLoggingUrl: `${environment.apiUrl}/api/logs`,
            serverLogLevel: environment.serverLogLevel,
            level: environment.logLevel,
            disableConsoleLogging: environment.disableConsoleLogging
          })
    ],
    exports: [
        LoggerModule
      ]
}) export class SharedLoggerModule { }
