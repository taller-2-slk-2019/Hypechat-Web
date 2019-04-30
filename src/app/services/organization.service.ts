import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { Organization } from '../models/Organization';
import {OrganizationStatistics} from '../models/OrganizationStatistics';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  private url = 'organizations';

  constructor(private serverService: ServerService) { }

  getOrganizations(): Observable<any> {
    return this.serverService.get<Organization[]>(this.url);
  }

  getStatistics(organizationId: string): Observable<any> {
    const url = `${this.url}/${organizationId}/statistics`;
    return this.serverService.get<OrganizationStatistics>(url);
  }

  addUser(organizationId: string, userEmail: string): Observable<any> {
    const data = {
      userEmails: [userEmail]
    };
    const url = `${this.url}/${organizationId}/invitations`;
    return this.serverService.post(url, data);
  }

  deleteUser(organizationId: string, userId: number) {
    const url = `${this.url}/${organizationId}/users/${userId}`;
    return this.serverService.delete(url);
  }

  deleteOrganization(organizationId: string) {
    const url = `${this.url}/${organizationId}`;
    return this.serverService.delete(url);
  }

  changeRole(userId: string, organizationId: string, newRole: string) {
    const data = {
      role: newRole
    };
    const url = `${this.url}/${organizationId}/users/${userId}`;
    return this.serverService.put(url, data);
  }

  createOrganization(data): Observable<any> {
    const params = new HttpParams().set('userToken', 'gAE4p7b1bRc4CZ77aExzgTFcv1O2'); // TODO change it for the new end point
    return this.serverService.post(this.url, data, params);
  }
}
