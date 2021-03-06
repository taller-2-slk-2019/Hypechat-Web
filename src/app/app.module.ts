import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { ForbiddenWordService } from './services/forbidden-word.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ToastrModule } from 'ngx-toastr';


// Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Google maps
import { AgmCoreModule } from '@agm/core';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    OrganizationComponent,
    MenuBarComponent,
    ChannelComponent,
    UserComponent,
    ConfirmDialogComponent,
    PieChartComponent,
    BarChartComponent,
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
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
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
    AgmCoreModule.forRoot({
      apiKey: environment.mapsKey
    })
  ],
  providers: [ForbiddenWordService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
