import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { MessageService } from '../services/message.service';
import { SnackBarService } from '../services/snackbar.service';
import { MockService } from '../utils/mock-service.spec';
import { MessageComponent } from './message.component';
import { Observable, of } from 'rxjs';

export class ActivatedRouteMock {
  public paramMap = of(convertToParamMap({
    id: 1
  }));
}

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let messageService;
  let translateService;
  let snackBarService;
  let router;

  beforeEach(() => {
    messageService = MockService.mock('MessageService', ['create']);
    translateService = MockService.mock('TranslateService', ['instant']);
    snackBarService = MockService.mock('SnackBarService', ['openSnackBar']);
    router = MockService.mock('Router', ['navigateByUrl']);
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: [
        { provide: MessageService, useValue: messageService },
        { provide: TranslateService, useValue: translateService },
        { provide: SnackBarService, useValue: snackBarService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: ActivatedRouteMock }
        // { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ })}}}
      ],
      imports: [LoggerTestingModule, RouterTestingModule]
    }).overrideComponent(MessageComponent, {
      // Setter le template à la valeur '' pour nepas gérer le code html.
      // On se concentre uniquement sur la logique métier.
      set: {
        template: ''
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO
});
