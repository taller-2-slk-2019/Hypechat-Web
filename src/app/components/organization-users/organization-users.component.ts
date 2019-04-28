import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../services/organization.service';

const CONNECTION_ERROR = 'Error de conexión';
const ROLES = { creator: 'Creador',
  moderator: 'Moderador',
  member: 'Miembro'
};

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

  constructor(private route: ActivatedRoute, private userService: UserService,
              private organizationService: OrganizationService) { }

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

  addUser() {
    this.organizationService.addUser(this.organizationId, this.email)
      .subscribe(data => {
        if (data.length === 0) {
          this.successMessage = 'El usuario se invitó exitosamente';
        } else {
          this.errorMessage = 'No se pudo invitar al usuario';
        }
      },
      error =>  this.errorMessage = 'No se pudo invitar al usuario');
  }

  deleteUser(deletedUser: User) {
      this.organizationService.deleteUser(this.organizationId, deletedUser.id)
        .subscribe(data => {
        this.users = this.users.filter(user => user.id !== deletedUser.id);
        this.successMessage = 'Se eliminó al usuario de la organización';
      },
      error =>  this.errorMessage = 'No se pudo eliminar al usuario');
  }

  showRole(user: User) {
    return ROLES[user.userOrganizations.role];
  }

  changeRole(user: User, newRole: string) {
    // TODO change role in the server
    user.userOrganizations.role = newRole;
  }
}
