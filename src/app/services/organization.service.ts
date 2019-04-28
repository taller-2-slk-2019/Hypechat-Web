import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { Organization } from '../models/Organization';

const QUERY_PARAMETER = 'userToken';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  private url = 'organizations';

  constructor(private serverService: ServerService) { }

  getOrganizations(): Observable<any> {
    return this.serverService.get<Organization[]>(this.url);
  }

  addUser(organizationId: string, userEmail: string): Observable<any> {
    const emails = [];
    emails.push(userEmail)
    const data = {
      userEmails: emails
    };
    const url = `${this.url}/${organizationId}/invitations`;
    return this.serverService.post(url, data);
  }

  deleteUser(organizationId: string, userId: number) {
    const url = `${this.url}/${organizationId}/users/${userId}`;
    return this.serverService.delete(url);
  }
}
