import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { ForbiddenWordComponent } from './forbidden-word/forbidden-word.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: '', component: OrganizationListComponent },
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
                                  StatisticsComponent,
                                  ForbiddenWordComponent,
                                  PageNotFoundComponent];
