import { Injectable } from '@angular/core';
import { MessageResource } from '../resources/message.resouce';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private messageResource: MessageResource,
              private logger: NGXLogger) { }

  create(message: Message): Observable<Message> {
    this.logger.info(`Create new message : ${message}`);
    return this.messageResource.create(message);
  }

  update(message: Message): Observable<Message> {
    this.logger.info(`Update message : ${message}`);
    return this.messageResource.update(message);
  }

  findById(id: number): Observable<Message> {
    this.logger.info(`Find message by Id : ${id}`);
    return this.messageResource.findById(id);
  }

  delete(id: number): Observable<Message> {
    this.logger.info(`Delete message by id : ${id}`);
    return this.messageResource.delete(id);
  }

  getAll(): Observable<Message[]> {
    this.logger.info(`Retrieve all messages`);
    return this.messageResource.getAll();
  }
}
