import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { of } from 'rxjs';
import { User } from '../models/user';
import { RegisterService } from '../services/register.service';
import { SnackBarService } from '../services/snackbar.service';
import { MockService } from '../utils/mock-service.spec';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerService;
  let translateService;
  let snackBarService;
  let router;

  beforeEach(() => {
    registerService = MockService.mock('RegisterService', ['createUser']);
    translateService = MockService.mock('TranslateService', ['instant']);
    snackBarService = MockService.mock('SnackBarService', ['openSnackBar']);
    router = MockService.mock('Router', ['navigateByUrl']);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: RegisterService, useValue: registerService },
        { provide: TranslateService, useValue: translateService },
        { provide: SnackBarService, useValue: snackBarService },
        { provide: Router, useValue: router }
      ],
      imports: [LoggerTestingModule, RouterTestingModule]
    }).overrideComponent(RegisterComponent, {
      // Setter le template à la valeur '' pour nepas gérer le code html.
      // On se concentre uniquement sur la logique métier.
      set: {
        template: ''
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#register() with empty registerForm', () => {
    // GIVEN

    // WHEN
    component.register();

    // THEN
    expect(component.submitted).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(component.isValidPassword()).toBeFalsy();
    expect(registerService.createUser).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('#register() with partial data for registerForm', () => {
    // GIVEN
    component.registerForm.controls.name.setValue('name');
    component.registerForm.controls.firstName.setValue('firstName');
    component.registerForm.controls.password.setValue('password');
    component.registerForm.controls.confirmPassword.setValue('sdv');

    // WHEN
    component.register();

    // THEN
    expect(component.submitted).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
    expect(component.isValidPassword()).toBeFalsy();
    expect(registerService.createUser).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });


  it('#register() with valid datas for registerForm', () => {
    // GIVEN
    const user: User = {
      name: 'name',
      firstName: 'firstName',
      mail: 'test_mail@gmail.com',
      // tslint:disable-next-line: no-hardcoded-credentials
      password: 'password',
      birthDay: new Date()
    };
    component.registerForm.controls.name.setValue(user.name);
    component.registerForm.controls.firstName.setValue(user.firstName);
    component.registerForm.controls.mail.setValue(user.mail);
    component.registerForm.controls.password.setValue(user.password);
    component.registerForm.controls.confirmPassword.setValue(user.password);
    component.registerForm.controls.birthDay.setValue(user.birthDay);
    registerService.createUser.and.returnValue(of(user));

    // WHEN
    component.register();

    // THEN
    expect(component.submitted).toBeTruthy();
    expect(component.registerForm.valid).toBeTruthy();
    expect(component.isValidPassword()).toBeTruthy();
    expect(registerService.createUser).toHaveBeenCalledTimes(1);
    // TODO expect(registerService.createUser).toHaveBeenCalledWith(user);
    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});


