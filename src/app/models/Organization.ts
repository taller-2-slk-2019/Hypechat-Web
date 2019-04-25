import { UserOrganizations } from './userOrganizations';

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
}
