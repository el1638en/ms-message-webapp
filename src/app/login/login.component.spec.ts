import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { of } from 'rxjs';
import { Token } from '../models/token';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import { SnackBarService } from '../services/snackbar.service';
import { MockService } from '../utils/mock-service.spec';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let translateService;
  let snackBarService;
  let router;
  let authService;
  let localStorageService;

  beforeEach(() => {
    authService = MockService.mock('AuthService', ['isAuthenticated', 'login']);
    localStorageService = MockService.mock('LocalstorageService', ['saveToken']);
    translateService = MockService.mock('TranslateService', ['instant']);
    snackBarService = MockService.mock('SnackBarService', ['openSnackBar']);
    router = MockService.mock('Router', ['navigate']);
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: TranslateService, useValue: translateService },
        { provide: LocalstorageService, useValue: localStorageService },
        { provide: SnackBarService, useValue: snackBarService },
        { provide: Router, useValue: router }
      ],
      imports: [RouterTestingModule, LoggerTestingModule ]
    }).overrideComponent(LoginComponent, {
      // Setter le template à la valeur '' pour ne pas avoir à gérer le code html.
      // On se concentre uniquement sur la logique métier.
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#login() with empty loginForm', () => {
    // GIVEN
    authService.isAuthenticated.and.returnValue(false);

    // WHEN
    component.login();

    // THEN
    expect(component.submitted).toBeTruthy();
    expect(component.loginForm.valid).toBeFalsy();
    expect(authService.login).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(snackBarService.openSnackBar).not.toHaveBeenCalled();
  });

  it('#login() with empty loginForm', () => {
    // GIVEN
    authService.isAuthenticated.and.returnValue(false);

    // WHEN
    component.login();

    // THEN
    expect(component.submitted).toBeTruthy();
    expect(component.loginForm.valid).toBeFalsy();
    expect(authService.login).not.toHaveBeenCalled();
    expect(localStorageService.saveToken).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(snackBarService.openSnackBar).not.toHaveBeenCalled();
  });

  it('#login() with bad format for the mail', () => {
    // GIVEN
    authService.isAuthenticated.and.returnValue(false);
    const BAD_FORMAT_MAIL = 'bad_format_mail';
    component.loginForm.controls.mail.setValue(BAD_FORMAT_MAIL);
    component.loginForm.controls.password.setValue('password');

    // WHEN
    component.login();

    // THEN
    expect(component.submitted).toBeTruthy();
    expect(component.loginForm.valid).toBeFalsy();
    expect(authService.login).not.toHaveBeenCalled();
    expect(localStorageService.saveToken).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(snackBarService.openSnackBar).not.toHaveBeenCalled();
  });

  it('#login() with credentials', () => {
    // GIVEN
    authService.isAuthenticated.and.returnValue(false);
    const token = new Token({
      value: 'token',
      dateExpiration: new Date(),
      userName: 'name',
      userFirstName: 'firstName',
      roleCode: 'CODE',
      roleLibelle: 'LIBELLE',
      fonctions: []
    });
    authService.login.and.returnValue(of(token));
    const mail = 'user@company.com';
    // tslint:disable-next-line: no-hardcoded-credentials
    const password = 'password';
    component.loginForm.controls.mail.setValue(mail);
    component.loginForm.controls.password.setValue(password);

    // WHEN
    component.login();

    // THEN
    expect(component.submitted).toBeTruthy();
    expect(component.loginForm.valid).toBeTruthy();
    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(authService.login).toHaveBeenCalledWith(mail, password);
    expect(localStorageService.saveToken).toHaveBeenCalledTimes(1);
    expect(localStorageService.saveToken).toHaveBeenCalledWith(token);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['messages']);
    expect(snackBarService.openSnackBar).toHaveBeenCalledTimes(1);
  });

});
