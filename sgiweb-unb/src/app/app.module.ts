import 'hammerjs';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

import { TextMaskModule } from 'angular2-text-mask';
import { MaterialModule } from './material.module';
import { routing } from './app.routing';

//Service
import { LoginService } from './services/login.service';
import { Validation } from './services/validation.service';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { NoContentComponent } from './no-content/no-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsComponent,
    NoContentComponent
  ],
  imports: [
    routing,
    HttpModule,
    FormsModule,
    BrowserModule,
    TextMaskModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [
    LoginService,
    Validation,
    {provide: LOCALE_ID, useValue: "pt-BR"},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
