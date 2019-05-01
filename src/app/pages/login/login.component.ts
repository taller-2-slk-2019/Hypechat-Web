import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  username = '';
  password = '';

  constructor(private localStorageService: LocalStorageService, private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  isInvalid() {
    const invalid = this.username === '';
    return invalid || this.password === '';
  }

  login() {
    this.loginService.login(this.username, this.password)
      .subscribe(data => {
        this.localStorageService.set('user', data);
        this.router.navigate(['']);
      });
  }
}
