import * as testing from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../services/message.service';
import { MockService } from '../utils/mock-service.spec';
import { MessagesComponent } from './messages.component';
import { of } from 'rxjs';
import { Message } from '../models/message';
import { LoggerTestingModule } from 'ngx-logger/testing';


describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: testing.ComponentFixture<MessagesComponent>;
  let messageService;
  let dialog;
  let translateService;

  beforeEach(() => {
    messageService = MockService.mock('MessageService', ['getAll', 'delete']);
    translateService = MockService.mock('TranslateService', ['instant']);
    dialog = MockService.mock('MatDialog', ['open']);
  });

  beforeEach(testing.async(() => {
    testing.TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      providers: [
        { provide: MessageService, useValue: messageService },
        { provide: TranslateService, useValue: translateService },
        { provide: MatDialog, useValue: dialog }
      ],
      imports: [LoggerTestingModule]
    }).overrideComponent(MessagesComponent, {
      // Setter le template à la valeur '' pour ne pas avoir à gérer le code html.
      // On se concentre uniquement sur la logique métier.
      set: {
        template: ''
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = testing.TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dataSource should be empty if there are no messages', () => {
    // GIVEN
    messageService.getAll.and.returnValue(of([]));

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(component.dataSource.data).toEqual([]);
  });

  it('should have array of messages', () => {
    // GIVEN
    const MESSAGE_1: Message = new Message({
      id: 1,
      title: 'title_1',
      content: 'content_1',
      beginDate: new Date(),
      endDate: new Date()
    });

    const MESSAGE_2: Message = new Message({
      id: 2,
      title: 'title_2',
      content: 'content_2',
      beginDate: new Date(),
      endDate: new Date()
    });
    messageService.getAll.and.returnValue(of([MESSAGE_1, MESSAGE_2]));

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(component.dataSource.data).toEqual([MESSAGE_1, MESSAGE_2]);
  });
});
