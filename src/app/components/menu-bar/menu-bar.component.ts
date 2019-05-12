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
  urls = { channels: `/organization/${this.organizationId}/channels`};

  constructor(private router: Router, private localStorageService: MyLocalStorageService) {
    this.isLogged = this.localStorageService.isLoggedIn();
    this.organization = this.localStorageService.getOrganization();
  }

  ngOnInit() {
    if (this.organizationId) {
      if (!this.organization || this.organization.id.toString() !== this.organizationId) {
        this.navigateToOrganization();
      }
    }
  }

  signOut() {
    this.localStorageService.clearAdmin();
    this.localStorageService.clearOrganization();
    this.localStorageService.clearChannel();
    this.router.navigate(['']);
  }

  navigateToOrganization() {
    this.localStorageService.clearOrganization();
    this.localStorageService.clearChannel();
    this.router.navigate(['/organization']);
  }

  redirect(extension) {
    this.localStorageService.clearChannel();
    this.router.navigate([`/organization/${this.organizationId}/${extension}`]);
  }
}
