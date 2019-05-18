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
import { MatButtonModule, MatToolbarModule, MatDialogModule, MatRadioModule, MatSlideToggleModule } from '@angular/material';
import { ChannelComponent } from './components/channel/channel.component';
import { TabsModule } from 'ngx-bootstrap';
import { UserComponent } from './components/user/user.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { NgxSpinnerModule } from 'ngx-spinner';

// Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Google maps
import { AgmCoreModule } from '@agm/core';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
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
    }),
    MatSlideToggleModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AgmCoreModule.forRoot()
  ],
  providers: [ForbiddenWordService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
