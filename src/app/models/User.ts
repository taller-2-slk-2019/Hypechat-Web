import {UserOrganizations} from './userOrganizations';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  picture: string;
  updatedAt: string;
  createdAt: string;
  latitude: number;
  longitude: number;
  userOrganizations: UserOrganizations;
}
