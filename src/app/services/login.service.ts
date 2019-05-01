import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { Admin } from '../models/Admin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'admin';

  constructor(private serverService: ServerService) { }

  login(user: string, pass: string): Observable<Admin>  {
    const data = {
      username: user,
      password: pass
    };
    return this.serverService.post(this.url + '/login', data);
  }
}
