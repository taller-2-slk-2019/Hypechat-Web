import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import {MyLocalStorageService} from '../../services/my-local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  username = '';
  password = '';
  invalid = false;

  constructor(private localStorageService: MyLocalStorageService, private loginService: AdminService,
              private router: Router, private spinner: NgxSpinnerService) {
    if (this.localStorageService.isLoggedIn()) {
      this.router.navigate(['organization']);
    }
  }

  ngOnInit() {
  }

  isInvalid() {
    const invalid = this.username === '';
    return invalid || this.password === '';
  }

  login() {
    this.invalid = false;
    this.spinner.show();
    this.loginService.login(this.username, this.password)
      .subscribe(data => {
        this.spinner.hide();
        this.localStorageService.setAdmin(data);
        this.router.navigate(['organization']);
      }, error => {
        this.invalid = true;
        this.spinner.hide();
      });
  }
}
