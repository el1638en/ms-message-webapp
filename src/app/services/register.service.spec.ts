import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RegisterService } from './register.service';
import { User } from '../models/user';
import { RegisterResource } from '../resources/register.resource';
import { MockService } from '../utils/mock-service.spec';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('RegisterService', () => {
  let registerResource;
  let registerService: RegisterService;

  beforeEach(() => {
    registerResource = MockService.mock('RegisterResource', ['create']);
  });

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      LoggerTestingModule
    ],
    providers: [
      { provide: RegisterResource, useValue: registerResource },
      RegisterService
    ]
  }).compileComponents());

  beforeEach(() => {
    registerService = TestBed.get(RegisterService);
  });

  it('RegisterService should be created', () => {
    expect(registerService).toBeTruthy();
  });

  it('#createUser should return user', (done) => {
    // GIVEN
    const mockUser: User = {
      name: 'name',
      firstName: 'firstName',
      mail: 'test_mail@gmail.com',
      // tslint:disable-next-line: no-hardcoded-credentials
      password: 'pwd',
      birthDay: new Date()
    };
    registerResource.create.and.returnValue(of(mockUser));

    // WHEN

    // THEN
    registerService.createUser(mockUser)
      .subscribe(user => {
        expect(registerResource.create).toHaveBeenCalledTimes(1);
        expect(user).toEqual(mockUser);
        done();
      });
  });

});
