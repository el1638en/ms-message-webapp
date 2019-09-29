import { NgModule } from '@angular/core';
import { MessagesComponent } from './messages.component';
import { MaterialModule } from '../material.module';
import { SharedTranslateModule } from '../shared.translate.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedTranslateModule],
    declarations: [
        MessagesComponent
    ]
}) export class MessagesModule { }

