import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../services/message.service';
import { SnackBarService } from '../services/snackbar.service';
import { RxjsComponent } from '../shared/rxjs-component';
import { Message } from '../models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent extends RxjsComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  create = false;
  update = false;
  idMessage: number;

  constructor(private messageService: MessageService,
              private snackBarService: SnackBarService, private router: Router,
              private translateService: TranslateService,  private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!!id) {
      this.update = true;
      this.idMessage = Number(id);
    } else {
      this.create = true;
    }
    this.initForm();
  }

  initForm(): void {
    if (this.create) {
      this.messageForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        content: new FormControl('', [Validators.required]),
        beginDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required])
      });
    }

    if (this.update) {
      this.messageService.findById(this.idMessage).subscribe(
        (message) => {
          this.messageForm = new FormGroup({
            title: new FormControl(message.title, [Validators.required]),
            content: new FormControl(message.content, [Validators.required]),
            beginDate: new FormControl(message.beginDate, [Validators.required]),
            endDate: new FormControl(message.endDate, [Validators.required])
          });
        }
      );
    }
    this.submitted = false;
  }

  /**
   * Méthode pour enregistrer un nouveau message.
   */
  save(): void {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    const messageBeginDate = new Date(this.messageForm.get('beginDate').value);
    const messageEndDate = new Date(this.messageForm.get('endDate').value);
    // TODO : les dates récupérées avec matDatePicker affichent un jour de moins. À creuser
    const message: Message = {
      id: this.idMessage ? this.idMessage : null,
      title: this.messageForm.get('title').value,
      content: this.messageForm.get('content').value,
      beginDate: messageBeginDate,
      endDate: messageEndDate
    };
    if (this.create) {
      this.addSubscription(this.messageService.create(message).subscribe(
        () => {
          this.successCreateOrUpdate('message.save.success');
        }
      ));
    }

    if (this.update) {
      this.addSubscription(this.messageService.update(message).subscribe(
        () => {
            this.successCreateOrUpdate('message.save.success');
        }
      ));
    }


  }

  successCreateOrUpdate(keyMessage: string) {
    this.router.navigate(['/messages']);
    this.snackBarService.openSnackBar(this.translateService.instant('new.message.save.success'));
  }

  isControlMissing(controlName: string): boolean {
    return this.submitted && this.messageForm.get(controlName).invalid;
  }
}
