import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'users/';

  constructor(private serverService: ServerService) { }

  getOrganizationUsers(organizationId: string): Observable<any> {
    const params = new HttpParams().set('organizationId', organizationId);
    return this.serverService.get<User[]>(this.url, params);
  }
}
