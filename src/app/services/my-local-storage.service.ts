import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Admin } from '../models/Admin';
import { Organization } from '../models/Organization';

@Injectable({
  providedIn: 'root'
})
export class MyLocalStorageService {

  constructor(private localStorageService: LocalStorageService) { }

  setAdmin(admin: Admin) {
    this.localStorageService.set('admin', admin);
  }

  getAdmin(): Admin {
    return this.localStorageService.get('admin');
  }

  isLoggedIn() {
    return this.localStorageService.get('admin') !== null;
  }

  clearAdmin() {
    this.localStorageService.remove('admin');
  }

  setOrganization(organization: Organization) {
    this.localStorageService.set('organization', organization);
  }

  getOrganization(): Organization {
    return this.localStorageService.get('organization');
  }

  clearOrganization() {
    this.localStorageService.remove('organization');
  }
}
