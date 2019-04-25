import { UserOrganizations } from './UserOrganizations';
import * as moment from 'moment';

export class Organization {
  id: number;
  name: string;
  picture: string;
  latitude: number;
  longitude: number;
  description: string;
  welcome: string;
  createdAt: string;
  updatedAt: string;
  userOrganizations: UserOrganizations;

  get creationDate() {
    return moment(this.createdAt);
  }
}
