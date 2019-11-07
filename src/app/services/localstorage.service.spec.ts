import { TestBed } from '@angular/core/testing';

import { LocalstorageService } from './localstorage.service';
import { Token } from '../models/token';
import { MockService } from '../utils/mock-service.spec';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('LocalstorageService', () => {
  let localstorageService: LocalstorageService;

  let store = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      LoggerTestingModule
    ]
  }));

  beforeEach(() => {
    localstorageService = TestBed.get(LocalstorageService);
  });

  it('should be created', () => {
    expect(localstorageService).toBeTruthy();
  });

  it('#saveToken() should save the token in the localstorage', () => {
    // GIVEN
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);

    // WHEN
    localstorageService.saveToken(new Token({}));

    // THEN
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('#getToken() should return the token in the localstorage', () => {
    // GIVEN
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);

    // WHEN
    localstorageService.getToken();

    // THEN
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('#removeToken() should remove the token in the localstorage', () => {
    // GIVEN
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    // WHEN
    localstorageService.removeToken();

    // THEN
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
  });
});
