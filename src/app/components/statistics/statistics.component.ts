import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';

const CONNECTION_ERROR = 'Error de conexión';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  title = 'Estadísticas';
  organizationId: string;
  users: Array<User> = [];
  errorMessage = '';
  creatorUser: Array<User> = [];
  administratorUser: Array<User> = [];
  memberUser: Array<User> = [];

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.userService.getOrganizationUsers(this.organizationId).
    subscribe(data => {
      this.users = data;
      // TODO Do it in general with hash
      // TODO show result with a graph
      this.creatorUser = this.users.filter(user => user.userOrganizations.role === 'creator');
      this.administratorUser = this.users.filter(user => user.userOrganizations.role === 'administrator');
      this.memberUser = this.users.filter(user => user.userOrganizations.role === 'member');
      },
      error =>  this.errorMessage = CONNECTION_ERROR
    );
  }
}
