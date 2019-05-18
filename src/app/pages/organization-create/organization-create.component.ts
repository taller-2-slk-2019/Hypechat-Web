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
  savedOrganization: Organization;
  organizationId: string;
  hasImage = false;
  file: File;
  files: FileList;
  imageUrl: any;

  constructor(private organizationService: OrganizationService, private storage: AngularFireStorage,
              spinnerService: NgxSpinnerService,
              localStorageService: MyLocalStorageService, router: Router) {
    super(localStorageService, router, spinnerService);
    this.savedOrganization = localStorageService.getOrganization();
  }

  ngOnInit() {
    this.reset();
    if (this.savedOrganization) {
      this.initializeOrganization();
      this.title = 'Editar Organización';
      this.organizationId = this.savedOrganization.id.toString();
      this.hasImage = true;
    }
  }

  initializeOrganization() {
    this.organization.name = this.savedOrganization.name;
    this.organization.picture = this.savedOrganization.picture;
    this.organization.latitude = this.savedOrganization.latitude;
    this.organization.longitude = this.savedOrganization.longitude;
    this.organization.description = this.savedOrganization.description;
    this.organization.welcome = this.savedOrganization.welcome;
    this.organization.id = this.savedOrganization.id;
    this.imageUrl = this.organization.picture;
  }

  reset() {
    this.organization.name = '';
    this.organization.picture = '';
    this.organization.latitude = -34.617566; // TODO Use Google map
    this.organization.longitude = -58.368440; // TODO Use Google map
    this.organization.description = '';
    this.organization.welcome = '';
    this.hasImage = false;
    this.file = null;
    this.files = null;
  }

  onNewFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.hasImage = true;
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  isInvalid() {
    let invalid = this.organization.name === '';
    invalid = invalid || this.organization.description === '';
    invalid = invalid || this.organization.welcome === '';
    invalid = invalid || !this.hasImage;
    return invalid;
  }

  saveOrganization() {
    if (this.savedOrganization) {
      this.editOrganization();
    } else {
      this.createOrganization();
    }
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

  editOrganization() {
    this.showLoading();
    if (this.file) {
      const path = `${Date.now()}_${this.file.name}`;
      const ref = this.storage.ref(path);
      this.storage.upload(path, this.file).then().finally(async () => {
        this.organization.picture = await ref.getDownloadURL().toPromise();
        this.updateOrganization();
      });
    } else {
      this.updateOrganization();
    }
  }

  private updateOrganization() {
    this.organizationService.editOrganization(this.organization)
      .subscribe( data => {
        this.setSuccess(`La organización "${this.organization.name}" fue actualizada`);
        this.file = null;
        this.files = null;
        this.hideLoading();
      }, error => {
        this.setError('No se pudo actualizar la organización');
        this.hideLoading();
      });
  }
}
