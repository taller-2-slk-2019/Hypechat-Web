import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import { OrganizationService } from '../../services/organization.service';
import { Organization } from '../../models/Organization';
import { ActivatedRoute, Router } from '@angular/router';
import { MyLocalStorageService } from '../../services/my-local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirebaseService } from '../../services/firebase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organization-create-edit',
  templateUrl: './organization-create-edit.component.html',
  styleUrls: ['./organization-create-edit.component.css']
})
export class OrganizationCreateEditComponent extends BaseComponent implements OnInit {
  title = 'Crear Organización';
  organization: Organization = new Organization();
  savedOrganization: Organization;
  organizationId: string;
  hasImage = false;
  file: File;
  files: FileList;
  imageUrl: any;
  locationChosen: boolean;
  hasChanged = false;

  constructor(private organizationService: OrganizationService, private firebase: FirebaseService,
              private storageService: MyLocalStorageService, spinnerService: NgxSpinnerService,
              router: Router, route: ActivatedRoute, toastService: ToastrService) {
    super(storageService, router, spinnerService, toastService);
    this.savedOrganization = this.storageService.getOrganization();
    this.organizationId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.reset();
    if (this.savedOrganization) {
      this.organization = this.savedOrganization;
      this.title = 'Editar Organización';
      this.imageUrl = this.organization.picture;
      this.hasImage = true;
      this.locationChosen = true;
    }
  }

  reset() {
    this.organization.name = '';
    this.organization.picture = '';
    this.organization.latitude = -34.617566;
    this.organization.longitude = -58.368440;
    this.organization.description = '';
    this.organization.welcome = '';
    this.hasImage = false;
    this.file = null;
    this.files = null;
    this.imageUrl = '../../../assets/no_image.png';
    this.locationChosen = false;
    this.hasChanged = false;
  }

  onNewFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.hasImage = true;
      this.hasChanged = true;
      const reader = new FileReader();
      reader.onload = (aux: any) => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.file = null;
      if (this.savedOrganization) {
        this.imageUrl = this.organization.picture;
      } else {
        this.imageUrl = '../../../assets/no_image.png';
        this.hasImage = false;
      }
    }
  }

  onInputChange() {
    this.hasChanged = true;
  }

  onChoseLocation(event) {
    this.organization.longitude = event.coords.lng;
    this.organization.latitude = event.coords.lat;
    this.locationChosen = true;
    this.hasChanged = true;
  }

  isInvalid() {
    let invalid = this.organization.name === '';
    invalid = invalid || this.organization.description === '';
    invalid = invalid || this.organization.welcome === '';
    invalid = invalid || !this.hasImage;
    invalid = invalid || !this.locationChosen;
    invalid = invalid || !this.hasChanged;
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
    this.firebase.upload(this.file).then(async () => {
      this.organization.picture = await this.firebase.getDownloadUrl();
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
    }).catch(firebaseError => {
      this.setError('No se pudo crear la organización');
      this.hideLoading();
    });
  }

  editOrganization() {
    this.showLoading();
    if (this.file) {
      this.firebase.upload(this.file).then(async () => {
        this.organization.picture = await this.firebase.getDownloadUrl();
        this.updateOrganization();
      }).catch(error => {
        this.setError('No se pudo actualizar la organización');
        this.hideLoading();
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
        this.hasChanged = false;
        this.storageService.setOrganization(this.organization);
        this.hideLoading();
      }, error => {
        this.setError('No se pudo actualizar la organización');
        this.hideLoading();
      });
  }
}
