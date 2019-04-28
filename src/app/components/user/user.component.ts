import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/User';

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

  constructor() { }

  ngOnInit() {
  }

  showRole(user: User) {
    return ROLES[user.userOrganizations.role];
  }

  changeRole(newRole: string) {
    // TODO change role in the server
    this.user.userOrganizations.role = newRole;
  }

  emitEvent() {
    this.event.emit(this.user);
  }
}
