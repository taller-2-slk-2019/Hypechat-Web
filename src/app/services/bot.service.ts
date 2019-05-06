import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { Bot } from '../models/Bot';

const QUERY_PARAMETER = 'organizationId';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  private url = 'bots';

  constructor(private http: HttpClient, private serverService: ServerService) { }

  getBots(organizationId: string): Observable<any> {
    const params = new HttpParams().set(QUERY_PARAMETER, organizationId);
    return this.serverService.get<Bot[]>(this.url, params);
  }

  addBot(botName: string, botUrl: string, id: string) {
    const data = {
      name: botName,
      url: botUrl,
      organizationId: id
    };
    return this.serverService.post<Bot>(this.url, data);
  }

  deleteBot(botId: number) {
    const url = `${this.url}/${botId}`;
    return this.serverService.delete(url);
  }
}
