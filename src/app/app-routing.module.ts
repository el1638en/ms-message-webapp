import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fonction } from './enums/fonctions';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'messages',
    canActivate: [AuthGuardService],
    component: MessagesComponent,
    data: {
      allowedRoles: [Fonction.CONSULTER_MESSAGE]
    }
  },
  {
    path: 'messages/new',
    canActivate: [AuthGuardService],
    component: MessageComponent,
    data: {
      allowedRoles: [Fonction.AJOUTER_MESSAGE]
    }
  },
  {
    path: 'messages/:id',
    canActivate: [AuthGuardService],
    component: MessageComponent,
    data: {
      allowedRoles: [Fonction.MODIFIER_MESSAGE]
    }
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
