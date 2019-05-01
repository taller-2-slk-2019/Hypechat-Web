import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  @Input() organizationId = '';
  @Input() showOrganizations = true;
  isLogged: boolean;

  constructor(private router: Router, private localStorageService: LocalStorageService) {
    this.isLogged = this.localStorageService.get('user') !== null;
  }

  ngOnInit() {
  }

  signOut() {
    this.localStorageService.clearAll();
    this.router.navigate(['login']);
  }
}
