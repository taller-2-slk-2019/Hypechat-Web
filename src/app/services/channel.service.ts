import { Injectable } from '@angular/core';
import {ServerService} from './server.service';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Channel} from '../models/Channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private url = 'channels';

  constructor(private serverService: ServerService) { }

  getChannels(organizationId: string): Observable<any> {
    const params = new HttpParams().set('organizationId', organizationId)
      .set('userToken', 'gAE4p7b1bRc4CZ77aExzgTFcv1O2');
    return this.serverService.get<Channel[]>(this.url, params); // TODO Change it for the new end point
  }
}
