import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/Organization';
import {OrganizationService} from '../../services/organization.service';
import {BaseComponent} from '../../components/base/base.component';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})

export class OrganizationListComponent extends BaseComponent implements OnInit {
  title = 'Organizaciones';
  organizations: Array<Organization> = [];

  constructor(private organizationService: OrganizationService,
              private dialogService: DialogService) {
    super();
  }

  ngOnInit() {
    this.organizationService.getOrganizations()
      .subscribe(data => this.organizations = data,
        error =>  this.setError(this.connectionError)
      );
  }

  deleteOrganization(organization: Organization) {
    this.dialogService.openConfirmDialog('¿Seguro que desea borrar la organización?')
      .afterClosed().subscribe(response => {
        if (response) {
          this.organizationService.deleteOrganization(organization.id.toString())
            .subscribe(data => {
                this.setSuccess(`La organización "${organization.name}" fue eliminada`);
                this.organizations = this.organizations.filter(org => org.id !== organization.id);
              },
              error => this.setError('No se pudo eliminar la organización'));
        }
    });
  }
}
