import { RegisterResource } from '../resources/register.resource';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root'
  })
export class RegisterService {

    constructor(private registerResource: RegisterResource, private logger: NGXLogger) {
    }

    createUser(user: User): Observable<User> {
        this.logger.info(`Register new user ${user}`);
        return this.registerResource.create(user);
    }

}

