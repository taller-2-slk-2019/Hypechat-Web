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
  users: Array<User> = [];
  channelId: string;
  successMessage = '';
  errorMessage = '';

  constructor(private route: ActivatedRoute, private userService: UserService,
              private channelService: ChannelService) { }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.channelId = this.route.snapshot.paramMap.get('channelId');
    this.channelService.getUsers(this.channelId)
      .subscribe(data => {
        this.users = data;
      },
      error =>  this.errorMessage = 'Error de conexión'
    );
  }

  deleteUser(user: User) { }
}
