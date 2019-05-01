import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MyLocalStorageService} from '../../services/my-local-storage.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  @Input() organizationId = '';
  @Input() showOrganizations = true;
  isLogged: boolean;

  constructor(private router: Router, private localStorageService: MyLocalStorageService) {
    this.isLogged = this.localStorageService.isLoggedIn();
  }

  ngOnInit() {
  }

  signOut() {
    this.localStorageService.clear();
    this.router.navigate(['']);
  }
}
