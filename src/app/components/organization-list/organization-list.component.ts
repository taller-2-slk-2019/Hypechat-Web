import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/Organization';
import {OrganizationService} from '../../services/organization.service';

const CONNECTION_ERROR = 'Error de conexión';
const EMPTY_WORD = '';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})

export class OrganizationListComponent implements OnInit {
  title = 'Organizaciones';
  organizations: Array<Organization> = [];
  successMessage = EMPTY_WORD;
  errorMessage = EMPTY_WORD;

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getOrganizations()
      .subscribe(data => this.organizations = data,
        error =>  this.errorMessage = CONNECTION_ERROR
      );
  }

}
