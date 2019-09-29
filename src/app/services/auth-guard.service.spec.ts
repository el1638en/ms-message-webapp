import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { MockService } from '../utils/mock-service.spec';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';


describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let authService;
  let router;

  beforeEach(() => {
    authService = MockService.mock('AuthService', ['isAuthenticated', 'isAuthorized']);
    router = MockService.mock('Router', ['navigate']);
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AuthService, useValue: authService },
      { provide: Router, useValue: router },
      AuthGuardService
    ]
  }).compileComponents());

  beforeEach(() => {
    authGuardService = TestBed.get(AuthGuardService);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('#canActivate() should return false if user is not authenticated', () => {
    // GIVEN
    authService.isAuthenticated.and.returnValue(false);

    // WHEN
    const canActivate = authGuardService.canActivate(new ActivatedRouteSnapshot(), {url: 'testUrl'} as RouterStateSnapshot);
    // THEN
    expect(canActivate).toBeFalsy();
    expect(authService.isAuthenticated).toHaveBeenCalledTimes(1);
    expect(authService.isAuthorized).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('#canActivate() should return false if user is authenticated but not authorized to access url', () => {
    // GIVEN
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();
    activatedRouteSnapshot.data = {
      allowedRoles: ['admin']
    };
    authService.isAuthenticated.and.returnValue(true);
    authService.isAuthorized.and.returnValue(false);

    // WHEN
    const canActivate = authGuardService.canActivate(activatedRouteSnapshot, {url: 'testUrl'} as RouterStateSnapshot);
    // THEN
    expect(canActivate).toBeFalsy();
    expect(authService.isAuthenticated).toHaveBeenCalledTimes(1);
    expect(authService.isAuthorized).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/accessdenied']);
  });

  it('#canActivate() should return true if user is authenticated and authorized to access url', () => {
    // GIVEN
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();
    activatedRouteSnapshot.data = {
      allowedRoles: ['admin']
    };
    authService.isAuthenticated.and.returnValue(true);
    authService.isAuthorized.and.returnValue(true);

    // WHEN
    const canActivate = authGuardService.canActivate(activatedRouteSnapshot, {url: 'testUrl'} as RouterStateSnapshot);
    // THEN
    expect(canActivate).toBeTruthy();
    expect(authService.isAuthenticated).toHaveBeenCalledTimes(1);
    expect(authService.isAuthorized).toHaveBeenCalledTimes(1);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
