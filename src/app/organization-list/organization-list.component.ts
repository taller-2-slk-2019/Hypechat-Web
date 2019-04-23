import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import {Organization} from '../models/Organization';

const CONNECTION_ERROR = 'Error de conexión';
const EMPTY_WORD = '';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})

export class OrganizationListComponent implements OnInit {
  title = 'Organizaciones';
  userToken = 'gAE4p7b1bRc4CZ77aExzgTFcv102'; // TODO harcoded token
  organizations: Array<Organization> = [];
  successMessage = EMPTY_WORD;
  errorMessage = EMPTY_WORD;

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getOrganizations(this.userToken)
      .subscribe(data => this.organizations = data,
        error =>  this.errorMessage = CONNECTION_ERROR
      );
  }

}
