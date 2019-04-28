import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { ForbiddenWordComponent } from './components/forbidden-word/forbidden-word.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { OrganizationUsersComponent } from './components/organization-users/organization-users.component';
import {ChannelListComponent} from './components/channel-list/channel-list.component';
import {ChannelUsersComponent} from './components/channel-users/channel-users.component';

const routes: Routes = [
  { path: '', component: OrganizationListComponent },
  { path: 'organization/:id/channels/:channelId', component: ChannelUsersComponent },
  { path: 'organization/:id/channels', component: ChannelListComponent },
  { path: 'organization/:id/users', component: OrganizationUsersComponent },
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
                                  PageNotFoundComponent];
