import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import {ActivatedRoute, Router} from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { BaseComponent } from '../../components/base/base.component';
import { RoleEvent } from '../../models/RoleEvent';
import {MyLocalStorageService} from '../../services/my-local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

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
              private organizationService: OrganizationService, spinnerService: NgxSpinnerService,
              localStorageService: MyLocalStorageService, router: Router) {
    super(localStorageService, router, spinnerService);
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.showLoading();
    this.userService.getOrganizationUsers(this.organizationId)
      .subscribe(data => {
        this.users = data;
        this.hideLoading();
      },
      error =>  {
        this.setError(this.connectionError);
        this.hideLoading();
      }
    );
  }

  isInvalid() {
    let result = this.email.includes(' ');
    result = result || !this.email.includes('@');
    result = result && this.email !== '';
    return result;
  }

  addUser() {
    this.showLoading();
    this.organizationService.addUser(this.organizationId, this.email)
      .subscribe(data => {
        if (data.length === 0) {
          this.setSuccess('El usuario fue invitado a la organización');
          this.email = '';
        } else {
          this.setError('No se pudo invitar al usuario');
        }
        this.hideLoading();
      },
      error =>  {
        this.setError('No se pudo invitar al usuario');
        this.hideLoading();
      });
  }

  deleteUser(deletedUser: User) {
    this.showLoading();
    this.organizationService.deleteUser(this.organizationId, deletedUser)
      .subscribe(data => {
        this.users = this.users.filter(user => user.id !== deletedUser.id);
        this.setSuccess(`Se eliminó al usuario "${deletedUser.name}" de la organización`);
        this.hideLoading();
      },
error =>  {
        this.setError('No se pudo eliminar al usuario');
        this.hideLoading();
      });
  }

  changeRole(roleEvent: RoleEvent) {
    const newRole = roleEvent.newRole;
    this.showLoading();
    this.organizationService.changeRole(roleEvent.user.id.toString(), this.organizationId, newRole)
      .subscribe( data => {
          this.setSuccess('Se modifico el rol del usuario');
          roleEvent.user.userOrganizations.role = newRole;
          this.hideLoading();
        },
        error => {
          this.setError('No se pudo modificar el rol');
          this.hideLoading();
      });
  }
}
