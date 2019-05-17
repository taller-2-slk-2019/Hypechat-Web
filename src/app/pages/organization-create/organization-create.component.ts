import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import {OrganizationService} from '../../services/organization.service';
import {Organization} from '../../models/Organization';
import {Router} from '@angular/router';
import {MyLocalStorageService} from '../../services/my-local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css']
})
export class OrganizationCreateComponent extends BaseComponent implements OnInit {
  title = 'Crear Organización';
  organization: Organization = new Organization();
  file: File;
  files: FileList;

  constructor(private organizationService: OrganizationService, private storage: AngularFireStorage,
              spinnerService: NgxSpinnerService,
              localStorageService: MyLocalStorageService, router: Router) {
    super(localStorageService, router, spinnerService);
  }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.organization.name = '';
    this.organization.picture = '';
    this.organization.latitude = -34.617566; // TODO Use Google map
    this.organization.longitude = -58.368440; // TODO Use Google map
    this.organization.description = '';
    this.organization.welcome = '';
    this.file = null;
    this.files = null;
  }

  isInvalid() {
    let invalid = this.organization.name === '';
    invalid = invalid || this.organization.description === '';
    invalid = invalid || this.organization.welcome === '';
    invalid = invalid || this.file === null;
    return invalid;
  }

  createOrganization() {
    this.showLoading();
    const path = `${Date.now()}_${this.file.name}`;
    const ref = this.storage.ref(path);
    this.storage.upload(path, this.file).then().finally(async () => {
      this.organization.picture = await ref.getDownloadURL().toPromise();
      this.organizationService.createOrganization(this.organization).subscribe(
        data => {
          this.setSuccess(`La organización "${data.name}" fue creada`);
          this.reset();
          this.hideLoading();
        },
        error => {
          this.setError('No se pudo crear la organización');
          this.hideLoading();
        }
      );
    });
  }

  onNewFile(event) {
    this.file = event.target.files[0];
  }
}
