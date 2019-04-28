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
}
