import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../services/organization.service';
import {BaseComponent} from '../base/base.component';

const ROLES = { creator: 'Creador',
  moderator: 'Moderador',
  member: 'Miembro'
};

@Component({
  selector: 'app-organization-users',
  templateUrl: './organization-users.component.html',
  styleUrls: ['./organization-users.component.css']
})

export class OrganizationUsersComponent extends BaseComponent implements OnInit {
  title = 'Estadísticas';
  organizationId: string;
  users: Array<User> = [];
  email = '';

  constructor(private route: ActivatedRoute, private userService: UserService,
              private organizationService: OrganizationService) {
    super();
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.userService.getOrganizationUsers(this.organizationId).
    subscribe(data => {
        this.users = data;
      },
      error =>  this.setError(this.connectionError)
    );
  }

  isInvalid() {
    let result = this.email.includes(' ');
    result = result || !this.email.includes('@');
    result = result && this.email !== '';
    return result;
  }

  addUser() {
    this.organizationService.addUser(this.organizationId, this.email)
      .subscribe(data => {
        if (data.length === 0) {
          this.setSuccess('El usuario se invitó exitosamente');
        } else {
          this.setError('No se pudo invitar al usuario');
        }
      },
      error =>  this.setError('No se pudo invitar al usuario'));
  }

  deleteUser(deletedUser: User) {
      this.organizationService.deleteUser(this.organizationId, deletedUser.id)
        .subscribe(data => {
        this.users = this.users.filter(user => user.id !== deletedUser.id);
        this.setSuccess('Se eliminó al usuario de la organización');
      },
      error =>  this.setError('No se pudo eliminar al usuario'));
  }
}
