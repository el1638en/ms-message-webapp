import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { User } from '../models/user';
import { RegisterService } from '../services/register.service';
import { SnackBarService } from '../services/snackbar.service';
import { RxjsComponent } from '../shared/rxjs-component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends RxjsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private registerService: RegisterService,
              private snackBarService: SnackBarService,
              private router: Router,
              private translateService: TranslateService,
              private logger: NGXLogger) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      birthDay: new FormControl(null, [Validators.required]),
    });
    this.submitted = false;
  }

  /**
   * Méthode pour enregistrer les données du formulaire.
   */
  register(): void {
    this.submitted = true;
    if (this.registerForm.invalid || !this.isValidPassword()) {
      return;
    }
    const date = new Date(this.registerForm.get('birthDay').value);
    date.setDate(date.getDate() + 1);
    const user: User = {
      name: this.registerForm.get('name').value,
      firstName: this.registerForm.get('firstName').value,
      mail: this.registerForm.get('mail').value,
      password: this.registerForm.get('password').value,
      birthDay: date
    };
    this.logger.info(`Register new user : ${user}`);
    this.addSubscription(this.registerService.createUser(user).subscribe(
      () => {
        this.router.navigateByUrl('/login');
        this.snackBarService.openSnackBar(this.translateService.instant('register.save.success'));
      },
    ));
  }

  isControlMissing(controlName: string): boolean {
    return this.submitted && this.registerForm.get(controlName).invalid;
  }

  isValidPassword(): boolean {
    return this.registerForm.valid &&
      this.registerForm.get('password').value === this.registerForm.get('confirmPassword').value;
  }

}
