import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ForbiddenWordsComponent } from './forbidden-words/forbidden-words.component';
import { ForbiddenWordsService } from './services/forbidden-words.service';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenWordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [ForbiddenWordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
