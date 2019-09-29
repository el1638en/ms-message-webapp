import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { AuthService } from '../services/auth.service';
import { MockService } from '../utils/mock-service.spec';
import { HeaderComponent } from './header.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService;
  let router;
  let authService;

  beforeEach(() => {
    authService = MockService.mock('AuthService', ['isAuthenticated', 'logout']);
    translateService = MockService.mock('TranslateService', ['instant', 'addLangs', 'use', 'setDefaultLang']);
    router = MockService.mock('Router', ['navigate']);
  });



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: TranslateService, useValue: translateService },
        { provide: Router, useValue: router }
      ],
      imports: [RouterTestingModule, LoggerTestingModule ]
    }).overrideComponent(HeaderComponent, {
      // Setter le template à la valeur '' pour ne pas avoir à gérer le code html.
      // On se concentre uniquement sur la logique métier.
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#isAuthenticated() returns false if user is not authenticated.', () => {
    // GIVEN
    authService.isAuthenticated.and.returnValue(false);

    // WHEN
    const isAuthenticated = component.isAuthenticated();

    // THEN
    expect(isAuthenticated).toBeFalsy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.isAuthenticated).toHaveBeenCalledTimes(1);
  });

  it('#isAuthenticated() returns True if user is authenticated.', () => {
    // GIVEN
    authService.isAuthenticated.and.returnValue(true);

    // WHEN
    const isAuthenticated = component.isAuthenticated();

    // THEN
    expect(isAuthenticated).toBeTruthy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.isAuthenticated).toHaveBeenCalledTimes(1);
  });

  it('#logout().', () => {
    // GIVEN

    // WHEN
    component.logout();

    // THEN
    expect(authService.logout).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });


  it('#useLanguage().', () => {
    // GIVEN
    const language = 'french';

    // WHEN
    component.useLanguage(language);

    // THEN
    expect(translateService.use).toHaveBeenCalled();
    expect(translateService.use).toHaveBeenCalledWith(language);
  });

});
