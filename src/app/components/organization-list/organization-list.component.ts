import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/Organization';
import {OrganizationService} from '../../services/organization.service';
import {BaseComponent} from '../base/base.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})

export class OrganizationListComponent extends BaseComponent implements OnInit {
  title = 'Organizaciones';
  organizations: Array<Organization> = [];

  constructor(private organizationService: OrganizationService) {
    super();
  }

  ngOnInit() {
    this.organizationService.getOrganizations()
      .subscribe(data => this.organizations = data,
        error =>  this.setError(this.connectionError)
      );
  }

}
