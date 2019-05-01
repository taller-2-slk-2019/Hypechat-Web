import { Injectable } from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {Admin} from '../models/Admin';

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
}
