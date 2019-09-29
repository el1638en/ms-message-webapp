import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { Token } from '../models/token';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import { SnackBarService } from '../services/snackbar.service';
import { RxjsComponent } from '../shared/rxjs-component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends RxjsComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  wrongCredentials = false;

  constructor(private snackBarService: SnackBarService,
              private router: Router,
              private authService: AuthService,
              private localStorageService: LocalstorageService,
              private translateService: TranslateService,
              private logger: NGXLogger) {
    super();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.logger.info(`User is already logged. Navigation to messages`);
      this.router.navigate(['messages']);
    } else {
      this.initForm();
    }
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
    this.submitted = false;
    this.wrongCredentials = false;
  }

  login(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      const mail = this.loginForm.get('mail').value;
      const password = this.loginForm.get('password').value;
      this.logger.info(`Authentication with credentials. Mail ${mail} and password *******.`);
      this.addSubscription(this.authService.login(mail, password).subscribe(
        (token) => {
          this.logger.info(`User with ${mail} authenticated successfully.`);
          this.localStorageService.saveToken(new Token(token));
          this.router.navigate(['messages']);
          this.snackBarService.openSnackBar(this.translateService.instant('login.success'));
        },
        (error) => {
          this.wrongCredentials = true;
        }
      ));
    }
  }

  register(): void {
    this.router.navigate(['register']);
  }

  isControlMissing(controlName: string): boolean {
    return this.submitted && this.loginForm.get(controlName).invalid;
  }

}
