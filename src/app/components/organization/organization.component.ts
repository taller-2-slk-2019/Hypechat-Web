import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Organization } from '../../models/Organization';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MyLocalStorageService } from '../../services/my-local-storage.service';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  @Input() organization: Organization;
  @Output() delete = new EventEmitter<Organization>();

  constructor(private router: Router, private localStorageService: MyLocalStorageService) { }

  ngOnInit() { }

  organizationCreationDate() {
    return moment(this.organization.createdAt);
  }

  deleteOrganization() {
    this.delete.emit(this.organization);
  }

  organizationSelected() {
    this.localStorageService.setOrganization(this.organization);
    this.router.navigate([`/organization/${this.organization.id}/edit`]);
  }
}
