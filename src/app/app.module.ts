import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ForbiddenWordComponent } from './forbidden-word/forbidden-word.component';
import { ForbiddenWordService } from './services/forbidden-word.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { AlertErrorComponent } from './alert-error/alert-error.component';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenWordComponent,
    AlertSuccessComponent,
    AlertErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ForbiddenWordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
