import { UserOrganizations } from './UserOrganizations';

export class User {
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
