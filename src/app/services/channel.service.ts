import { Injectable } from '@angular/core';
import {ServerService} from './server.service';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Channel} from '../models/Channel';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private url = 'channels';

  constructor(private serverService: ServerService) { }

  getChannels(organizationId: string): Observable<any> {
    const params = new HttpParams().set('organizationId', organizationId);
    return this.serverService.get<Channel[]>(this.url, params);
  }

  getUsers(channelId: string): Observable<any> {
    const url = `${this.url}/${channelId}/users`;
    return this.serverService.get<User[]>(url);
  }

  addUser(channelId: string, user: User) {
    const url = `${this.url}/${channelId}/users`;
    const data = {
      userId: user.id
    };
    return this.serverService.post(url, data);
  }

  deleteUser(channelId: string, user: User) {
    const url = `${this.url}/${channelId}/users/${user.id}/`;
    return this.serverService.delete(url);
  }

  deleteChannel(channelId: string) {
    const url = `${this.url}/${channelId}`;
    return this.serverService.delete(url);
  }

  createChannel(data): Observable<any> {
    return this.serverService.post(this.url, data);
  }

  editChannel(channel): Observable<any> {
    const url = `${this.url}/${channel.id}`;
    return this.serverService.put(url, channel);
  }
}
