import {Component, Input, OnInit} from '@angular/core';
import { Organization } from '../../models/Organization';
import * as moment from 'moment';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  @Input() organization: Organization;

  constructor() { }

  ngOnInit() { }

  organizationCreationDate() {
    return moment(this.organization.createdAt);
  }
}
