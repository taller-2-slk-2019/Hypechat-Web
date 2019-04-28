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
  @Output() event = new EventEmitter<User>();
  @Output() roleEvent = new EventEmitter<RoleEvent>();

  constructor() { }

  ngOnInit() {
  }

  showRole(user: User) {
    return ROLES[user.userOrganizations.role];
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
