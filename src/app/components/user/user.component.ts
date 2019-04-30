import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/User';
import {RoleEvent} from '../../models/RoleEvent';

const ROLES = { creator: 'Creador',
  moderator: 'Moderador',
  member: 'Miembro'
};

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() showRoles = false;
  @Input() isDelete = true;
  @Output() click = new EventEmitter<User>();
  @Output() roleChange = new EventEmitter<RoleEvent>();

  constructor() { }

  ngOnInit() {
  }

  showRole(user: User) {
    return ROLES[user.userOrganizations.role];
  }

  emitEvent() {
    this.click.emit(this.user);
  }

  emitRoleEvent(role: string) {
    const roleEvent = {
      user: this.user,
      newRole: role
    };
    this.roleChange.emit(roleEvent);
  }
}
