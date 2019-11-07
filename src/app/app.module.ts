import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HasRoleDirective } from './has-role.directive';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { RegisterComponent } from './register/register.component';
import { SharedLoggerModule } from './shared.logger.module';
import { SharedTranslateModule } from './shared.translate.module';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { TokenInterceptorModule } from './token.interceptor.module';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedTranslateModule,
    SharedLoggerModule,
    TokenInterceptorModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MessagesComponent,
    MessageComponent,
    ConfirmDialogComponent,
    HeaderComponent,
    HasRoleDirective
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
