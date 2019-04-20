import {Component, Input, OnInit} from '@angular/core';
import {Organization} from '../models/Organization';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  @Input() organization: Organization;
  createdAt: string;

  constructor() { }

  ngOnInit() {
    const date = new Date (this.organization.createdAt);
    this.createdAt = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
  }

}
