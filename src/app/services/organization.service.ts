import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { Organization } from '../models/Organization';


@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  private url = 'organizations';

  constructor(private serverService: ServerService) { }

  getOrganizations(userToken: string): Observable<any> {
    const params = new HttpParams().set('userToken', userToken);
    return this.serverService.get<Organization[]>(this.url, params);
  }
}
