import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { BaseComponent } from '../../components/base/base.component';
import { RoleEvent } from '../../models/RoleEvent';

@Component({
  selector: 'app-organization-users',
  templateUrl: './organization-users.component.html',
  styleUrls: ['./organization-users.component.css']
})

export class OrganizationUsersComponent extends BaseComponent implements OnInit {
  title = 'Usuarios';
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
          this.setSuccess('El usuario fue invitado a la organización');
          this.email = '';
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
      this.setSuccess(`Se eliminó al usuario "${deletedUser.name}" de la organización`);
    },
    error =>  this.setError('No se pudo eliminar al usuario'));
  }

  changeRole(roleEvent: RoleEvent) {
    // TODO change role in the server
    const newRole = roleEvent.newRole;
    /*
    this.organizationService.changeRole(roleEvent.user.id.toString(), this.organizationId, newRole)
      .subscribe( data => {
          this.setSuccess('Se modifico el rol del usuario');
          roleEvent.user.userOrganizations.role = newRole;
        },
        error => this.setError('No se pudo modificar el rol')
      );
     */
    roleEvent.user.userOrganizations.role = newRole;
  }
}
