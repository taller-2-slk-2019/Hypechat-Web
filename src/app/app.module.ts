import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { ForbiddenWordService } from './services/forbidden-word.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertSuccessComponent } from './components/alert-success/alert-success.component';
import { AlertErrorComponent } from './components/alert-error/alert-error.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import {MatButtonModule, MatToolbarModule, MatDialogModule, MatRadioModule} from '@angular/material';
import { ChannelComponent } from './components/channel/channel.component';
import { TabsModule } from 'ngx-bootstrap';
import { UserComponent } from './components/user/user.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChannelCreateComponent } from './pages/channel-create/channel-create.component';
import { OrganizationCreateComponent } from './pages/organization-create/organization-create.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertSuccessComponent,
    AlertErrorComponent,
    routingComponents,
    OrganizationComponent,
    MenuBarComponent,
    ChannelComponent,
    UserComponent,
    ConfirmDialogComponent,
    PieChartComponent,
    ChannelCreateComponent,
    OrganizationCreateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ChartsModule,
    TabsModule,
    MatRadioModule,
    LocalStorageModule.forRoot({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  providers: [ForbiddenWordService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
