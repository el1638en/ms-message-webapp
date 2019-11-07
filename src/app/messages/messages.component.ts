import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { RxjsComponent } from '../shared/rxjs-component';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent extends RxjsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'content', 'beginDate', 'endDate', 'action'];
  dataSource = new MatTableDataSource<Message>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private messageService: MessageService,
              private dialog: MatDialog,
              private translateService: TranslateService,
              private logger: NGXLogger) {
    super();
  }

  ngOnInit() {
    this.logger.info(`ngOnInit MessagesComponent`);
    this.loadMessage();
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: this.translateService.instant('messages.confirm.delete')
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logger.info(`Delete message by id: ${id}`);
        this.addSubscription(this.messageService.delete(id).subscribe(
          () => this.loadMessage()
        ));
      }
    });
  }

  private loadMessage(): void {
    this.logger.info(`Load message from messageService`);
    this.addSubscription(this.messageService.getAll().subscribe(
      (messages) => { this.dataSource.data = messages; },
    ));
  }

}
