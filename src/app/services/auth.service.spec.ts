import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { LoginResource } from '../resources/login.resource';
import { LocalstorageService } from './localstorage.service';
import { Token } from '../models/token';
import { Fonction } from '../models/fonction';

describe('AuthService', () => {
  let authService: AuthService;
  const spyLoginResource = jasmine.createSpyObj('LoginResource', ['login']);
  const spyLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['getToken', 'removeToken']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: LoginResource, useValue: spyLoginResource },
      { provide: LocalstorageService, useValue: spyLocalStorageService },
      AuthService
    ]
  }).compileComponents());

  beforeEach(() => {
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    // GIVEN

    // WHEN

    // THEN
    expect(authService).toBeTruthy();
  });

  it('#isAuthenticated() should return false if there is no token in localstorage', () => {
    // GIVEN
    spyLocalStorageService.getToken.and.returnValue(null);

    // WHEN
    const result = authService.isAuthenticated();
    // THEN
    expect(result).toBeFalsy();
  });

  it('#isAuthenticated() should return true if there is token valid in localstorage', () => {
    // GIVEN
    spyLocalStorageService.getToken.and.returnValue(new Token({}));

    // WHEN
    const result = authService.isAuthenticated();
    // THEN
    expect(result).toBeTruthy();
  });

  it('#isAuthorized() should return true if allowedRoles is empty', () => {
    // GIVEN
    const allowedRoles: string[] = [];

    // WHEN
    const result = authService.isAuthorized(allowedRoles);
    // THEN
    expect(result).toBeTruthy();
  });

  it('#isAuthorized() should return false if user\'s token have not role', () => {
    // GIVEN
    const token: Token = new Token({
      fonctions: []
    });
    spyLocalStorageService.getToken.and.returnValue(token);
    const allowedRoles: string[] = ['admin'];

    // WHEN
    const result = authService.isAuthorized(allowedRoles);

    // THEN
    expect(result).toBeFalsy();
  });

  it('#isAuthorized() should return false if user\'s role does not match allowedRole', () => {
    // GIVEN
    const token: Token = new Token({
      fonctions: [new Fonction({code: 'consult'})]
    });
    spyLocalStorageService.getToken.and.returnValue(token);
    const allowedRoles: string[] = ['admin'];

    // WHEN
    const result = authService.isAuthorized(allowedRoles);

    // THEN
    expect(result).toBeFalsy();
  });

  it('#isAuthorized() should return true if allowedRole contains user\'s role', () => {
    // GIVEN
    const token: Token = new Token({
      fonctions: [new Fonction({code: 'user'})]
    });
    spyLocalStorageService.getToken.and.returnValue(token);
    const allowedRoles: string[] = ['admin', 'user'];

    // WHEN
    const result = authService.isAuthorized(allowedRoles);

    // THEN
    expect(result).toBeTruthy();
  });
});
