import { TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { of } from 'rxjs';
import { Message } from '../models/message';
import { MessageResource } from '../resources/message.resouce';
import { MockService } from '../utils/mock-service.spec';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;
  let messageResource;


  beforeEach(() => {
    messageResource = MockService.mock('MessageResource', ['create', 'delete', 'update', 'getAll']);
  });

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      LoggerTestingModule
    ],
    providers: [
      { provide: MessageResource, useValue: messageResource },
      MessageService
    ]
  }).compileComponents());

  beforeEach(() => {
    messageService = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(messageService).toBeTruthy();
  });


  it('#create() should call resource messageResource', () => {
    // GIVEN
    const message: Message = new Message({
      id: null,
      title: 'title_1',
      content: 'content_1',
      beginDate: new Date(),
      endDate: new Date()
    });

    // WHEN
    messageService.create(message);

    // THEN
    expect(messageResource.create).toHaveBeenCalledWith(message);
  });

  it('#update() should call resource messageResource', () => {
    // GIVEN
    const message: Message = new Message({
      id: 1,
      title: 'updateTitle',
      content: 'updateContent',
      beginDate: new Date(),
      endDate: new Date()
    });

    // WHEN
    messageService.update(message);

    // THEN
    expect(messageResource.update).toHaveBeenCalledWith(message);
  });

  it('#delete() should call resource messageResource', () => {
    // GIVEN
    const messageId = 1;

    // WHEN
    messageService.delete(messageId);

    // THEN
    expect(messageResource.delete).toHaveBeenCalledWith(messageId);
  });


  it('#getAll() should return all messages', (done) => {
    // GIVEN
    const message1: Message = new Message({
      id: 1,
      title: 'title_1',
      content: 'content_1',
      beginDate: new Date(),
      endDate: new Date()
    });
    const message2: Message = new Message({
      id: 2,
      title: 'title_2',
      content: 'content_2',
      beginDate: new Date(),
      endDate: new Date()
    });
    messageResource.getAll.and.returnValue(of([message1, message2]));

    // WHEN

    // THEN
    messageService.getAll().subscribe(messages => {
      expect(messageResource.getAll).toHaveBeenCalledTimes(1);
      expect(messages).toContain(message1, message2);
      done();
    }
    );
  });

});
