import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyLocalStorageService } from '../../services/my-local-storage.service';
import { Organization } from '../../models/Organization';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  @Input() organizationId = '';
  @Input() showOrganizations = true;
  organization: Organization;
  isLogged: boolean;

  constructor(private router: Router, private localStorageService: MyLocalStorageService) {
    this.isLogged = this.localStorageService.isLoggedIn();
    this.organization = this.localStorageService.getOrganization();
  }

  ngOnInit() {
  }

  signOut() {
    this.localStorageService.clearAdmin();
    this.localStorageService.clearOrganization();
    this.router.navigate(['']);
  }

  navigateToOrganization() {
    this.localStorageService.clearOrganization();
    this.router.navigate(['/organization']);
  }
}
