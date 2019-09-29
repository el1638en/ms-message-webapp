import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  logLevel: NgxLoggerLevel.WARN,
  disableConsoleLogging: false,
  serverLogLevel: NgxLoggerLevel.WARN,
};
