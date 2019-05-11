import { Component, OnInit } from '@angular/core';
import {Organization} from '../../models/Organization';
import {OrganizationService} from '../../services/organization.service';
import {BaseComponent} from '../../components/base/base.component';
import {DialogService} from '../../services/dialog.service';
import {Router} from '@angular/router';
import {MyLocalStorageService} from '../../services/my-local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})

export class OrganizationListComponent extends BaseComponent implements OnInit {
  title = 'Organizaciones';
  organizations: Array<Organization> = [];
  search = '';

  constructor(private organizationService: OrganizationService,
              private dialogService: DialogService, router: Router,
              localStorageService: MyLocalStorageService, spinnerService: NgxSpinnerService) {
    super(localStorageService, router, spinnerService);
  }

  ngOnInit() {
    this.showLoading();
    this.organizationService.getOrganizations()
      .subscribe(data => {
        this.organizations = data;
        this.hideLoading();
      },
error => {
        this.setError(this.connectionError);
        this.hideLoading();
      });
  }

  deleteOrganization(organization: Organization) {
    this.dialogService.openConfirmDialog('¿Seguro que desea borrar la organización?')
      .afterClosed().subscribe(response => {
        if (response) {
          this.showLoading();
          this.organizationService.deleteOrganization(organization.id.toString())
            .subscribe(data => {
                this.setSuccess(`La organización "${organization.name}" fue eliminada`);
                this.organizations = this.organizations.filter(org => org.id !== organization.id);
                this.hideLoading();
              },
              error => {
                this.setError('No se pudo eliminar la organización');
                this.hideLoading();
              });
        }
    });
  }
}
