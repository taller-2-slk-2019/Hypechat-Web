import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from './pages/organization-list/organization-list.component';
import { ForbiddenWordComponent } from './pages/forbidden-word/forbidden-word.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { OrganizationUsersComponent } from './pages/organization-users/organization-users.component';
import { ChannelListComponent } from './pages/channel-list/channel-list.component';
import { ChannelUsersComponent } from './pages/channel-users/channel-users.component';
import { ChannelCreateComponent } from './pages/channel-create/channel-create.component';
import { LoginComponent } from './pages/login/login.component';
import { OrganizationBotsComponent } from './pages/organization-bots/organization-bots.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'organization', component: OrganizationListComponent },
  { path: 'organization/:id/channels/create', component: ChannelCreateComponent },
  { path: 'organization/:id/channels/:channelId', component: ChannelUsersComponent },
  { path: 'organization/:id/channels', component: ChannelListComponent },
  { path: 'organization/:id/users', component: OrganizationUsersComponent },
  { path: 'organization/:id/bots', component: OrganizationBotsComponent },
  { path: 'organization/:id/statistics', component: StatisticsComponent },
  { path: 'organization/:id/forbiddenWords', component: ForbiddenWordComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [OrganizationListComponent,
                                  ChannelListComponent,
                                  ChannelUsersComponent,
                                  OrganizationUsersComponent,
                                  StatisticsComponent,
                                  ForbiddenWordComponent,
                                  PageNotFoundComponent,
                                  ChannelCreateComponent,
                                  OrganizationBotsComponent,
                                  LoginComponent];
