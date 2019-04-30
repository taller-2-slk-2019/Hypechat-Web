import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
import {OrganizationService} from '../../services/organization.service';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css']
})
export class OrganizationCreateComponent extends BaseComponent implements OnInit {
  title = 'Crear Organización';
  name: string;
  picture: string;
  latitude: number;
  longitude: number
  description: string;
  welcome: string;

  constructor(private organizationService: OrganizationService) {
    super();
  }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.name = '';
    // TODO Upload photo to firebase
    this.picture = 'https://firebasestorage.googleapis.com/v0/b/hypechat-2fee8.appspot.com/o/fc693346-c672-4252-b8e6-627dc4050507image%3A77?alt=media&token=1620d265-238d-42b1-88a1-b687fefa70de';
    this.latitude = -34.617566; // TODO Use Google map
    this.longitude = -58.368440; // TODO Use Google map
    this.description = '';
    this.welcome = '';
  }

  isInvalid() {
    let valid = this.name === '';
    valid = valid || this.picture === '';
    valid = valid || this.description === '';
    valid = valid || this.welcome === '';
    return valid;
  }

  createOrganization() {
    const organization = {
      name: this.name,
      picture: this.picture,
      latitude: this.latitude,
      longitude: this.longitude,
      description: this.description,
      welcome: this.welcome,
    };
    this.organizationService.createOrganization(organization).subscribe(
      data => {
        this.setSuccess(`La organización "${data.name}" fue creada`);
        this.reset();
      },
      error => this.setError('No se pudo crear la organización')
    );
  }
}
