import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { ForbiddenWordService } from './services/forbidden-word.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertSuccessComponent } from './components/alert-success/alert-success.component';
import { AlertErrorComponent } from './components/alert-error/alert-error.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { ChannelComponent } from './components/channel/channel.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertSuccessComponent,
    AlertErrorComponent,
    routingComponents,
    OrganizationComponent,
    MenuBarComponent,
    ChannelComponent
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
