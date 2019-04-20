import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationListComponent} from './organization-list/organization-list.component';
import {ForbiddenWordComponent} from './forbidden-word/forbidden-word.component';

const routes: Routes = [
  { path: '', component: OrganizationListComponent },
  { path: 'forbiddenWord/:id', component: ForbiddenWordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [OrganizationListComponent,
                                  ForbiddenWordComponent];
