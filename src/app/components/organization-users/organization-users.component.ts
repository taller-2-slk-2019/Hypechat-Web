import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {ActivatedRoute} from '@angular/router';

const CONNECTION_ERROR = 'Error de conexión';


@Component({
  selector: 'app-organization-users',
  templateUrl: './organization-users.component.html',
  styleUrls: ['./organization-users.component.css']
})

export class OrganizationUsersComponent implements OnInit {
  title = 'Estadísticas';
  organizationId: string;
  users: Array<User> = [];
  successMessage = '';
  errorMessage = '';
  email = '';

    constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.userService.getOrganizationUsers(this.organizationId).
    subscribe(data => {
        this.users = data;
      },
      error =>  this.errorMessage = CONNECTION_ERROR
    );
  }

  isInvalid() {
    let result = this.email.includes(' ');
    result = result || !this.email.includes('@');
    result = result && this.email !== '';
    return result;
  }

  addUser() { }

  deleteUser(user: User) { }
}
