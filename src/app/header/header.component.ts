import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private translateService: TranslateService,
              private authService: AuthService,
              private router: Router) {

  }

  ngOnInit() {
    this.translateService.addLangs(['en', 'fr']);
    this.translateService.setDefaultLang('fr');
    this.translateService.use('fr');
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  useLanguage(language: string): void {
    this.translateService.use(language);
  }

}
