import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/User';
import {RoleEvent} from '../../models/RoleEvent';
import {UserRoleHelper} from '../../helpers/UserRoleHelper';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() showRoles = false;
  @Input() isDelete = true;
  @Output() event = new EventEmitter<User>();
  @Output() roleEvent = new EventEmitter<RoleEvent>();

  allRoles: any;

  constructor() { }

  ngOnInit() {
    this.allRoles = UserRoleHelper.getRoles();
  }

  showRole(user: User) {
    return this.getRole(user.userOrganizations.role);
  }

  getRole(role: string) {
    return UserRoleHelper.translate(role);
  }

  emitEvent() {
    this.event.emit(this.user);
  }

  emitRoleEvent(role: string) {
    const roleEvent = {
      user: this.user,
      newRole: role
    };
    this.roleEvent.emit(roleEvent);
  }
}
