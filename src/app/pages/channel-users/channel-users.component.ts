import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ChannelService } from '../../services/channel.service';
import { User } from '../../models/User';
import { BaseComponent } from '../../components/base/base.component';
import { MyLocalStorageService } from '../../services/my-local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-channel-users',
  templateUrl: './channel-users.component.html',
  styleUrls: ['./channel-users.component.css']
})
export class ChannelUsersComponent extends BaseComponent implements OnInit {
  title = 'Usuarios';
  organizationId: string;
  channelUsers: Array<User> = [];
  organizationUsers: Array<User> = [];
  channelId: string;

  constructor(private route: ActivatedRoute, private userService: UserService,
              private channelService: ChannelService, localStorageService: MyLocalStorageService,
              router: Router,  spinnerService: NgxSpinnerService, toastService: ToastrService) {
    super(localStorageService, router, spinnerService, toastService);
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    this.channelId = this.route.snapshot.paramMap.get('channelId');
    this.showLoading();
    this.userService.getOrganizationUsers(this.organizationId)
      .subscribe(data => {
          this.organizationUsers = data;
          this.hideLoading();
          this.initChannelUsers();
        },
        error =>  {
          this.setError(this.connectionError);
          this.hideLoading();
        }
      );
  }

  addUser(user: User) {
    this.showLoading();
    this.channelService.addUser(this.channelId, user)
      .subscribe(data => {
          this.channelUsers.push(user);
          this.organizationUsers = this.organizationUsers.filter(usr => usr.id !== user.id);
          this.setSuccess(`Se agregó al usuario "${user.name}" al canal`);
          this.hideLoading();
      },
      error =>  {
        this.setError('No se pudo agregar al usuario');
        this.hideLoading();
      }
    );
  }

  deleteUser(user: User) {
    this.showLoading();
    this.channelService.deleteUser(this.channelId, user)
      .subscribe(data => {
          this.organizationUsers.push(user);
          this.channelUsers = this.channelUsers.filter(usr => usr.id !== user.id);
          this.setSuccess(`Se eliminó al usuario "${user.name}" del canal`);
          this.hideLoading();
        },
        error =>  {
          this.setError('No se pudo eliminar al usuario');
          this.hideLoading();
        }
      );
  }

  private initChannelUsers() {
    this.showLoading();
    this.channelService.getUsers(this.channelId)
      .subscribe(data => {
          this.channelUsers = data;
          this.organizationUsers = this.organizationUsers.filter(user => !this.channelContainsUser(user));
          this.hideLoading();
        },
        error =>  {
          this.setError(this.connectionError);
          this.hideLoading();
        }
      );
  }

  private channelContainsUser(user: User) {
    return this.channelUsers.some(usr => usr.id === user.id);
  }
}
