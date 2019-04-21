import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { ForbiddenWordService } from './services/forbidden-word.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { AlertErrorComponent } from './alert-error/alert-error.component';
import { OrganizationComponent } from './organization/organization.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AlertSuccessComponent,
    AlertErrorComponent,
    routingComponents,
    OrganizationComponent,
    MenuBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [ForbiddenWordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
