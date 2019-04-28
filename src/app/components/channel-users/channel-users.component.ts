import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ChannelService} from '../../services/channel.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-channel-users',
  templateUrl: './channel-users.component.html',
  styleUrls: ['./channel-users.component.css']
})
export class ChannelUsersComponent implements OnInit {
  title = 'Usuarios';
  organizationId: string;
  channelUsers: Array<User> = [];
  organizationUsers: Array<User> = [];
  channelId: string;
  successMessage = '';
  errorMessage = '';

  constructor(private route: ActivatedRoute, private userService: UserService,
              private channelService: ChannelService) { }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.channelId = this.route.snapshot.paramMap.get('channelId');
    this.userService.getOrganizationUsers(this.organizationId)
      .subscribe(data => {
          this.organizationUsers = data;
          this.initChannelUsers();
        },
        error =>  this.errorMessage = 'Error de conexión'
      );
  }

  addUser(user: User) {
    this.channelService.addUser(this.channelId, user)
      .subscribe(data => {
          this.channelUsers.push(user);
          this.organizationUsers = this.organizationUsers.filter(usr => usr.id !== user.id);
      },
      error =>  this.errorMessage = 'No se pudo agregar al usuario'
    );
  }

  deleteUser(user: User) {
    this.channelService.deleteUser(this.channelId, user)
      .subscribe(data => {
          this.organizationUsers.push(user);
          this.channelUsers = this.channelUsers.filter(usr => usr.id !== user.id);
        },
        error =>  this.errorMessage = 'No se pudo eliminar al usuario'
      );
  }

  private initChannelUsers() {
    this.channelService.getUsers(this.channelId)
      .subscribe(data => {
          this.channelUsers = data;
          this.organizationUsers = this.organizationUsers.filter(user => !this.channelContainsUser(user));
        },
        error =>  this.errorMessage = 'Error de conexión'
      );
  }

  private channelContainsUser(user: User) {
    return this.channelUsers.filter(usr => usr.id === user.id).length === 1;
  }
}
