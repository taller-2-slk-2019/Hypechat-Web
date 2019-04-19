import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ForbiddenWord } from '../models/ForbiddenWord';
import { ServerService } from './server.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenWordService {
  private url = 'forbiddenWords';

  constructor(private http: HttpClient, private serverService: ServerService) { }

  getForbiddenWords(): Observable<any> {
    const params = new HttpParams().set('organizationId', '1');  //TODO harcoded id
    return this.serverService.get<ForbiddenWord[]>(this.url, params);
  }

  addForbiddenWord(newWord: string) {
    const data = {
      word: newWord,
      organizationId: '1'  //TODO harcoded id
    };
    return this.serverService.post(this.url, data);
  }

  deleteForbiddenWord(deleteWord: number) {
    const url = `${this.url}/${deleteWord.toString()}`;
    return this.serverService.delete(url);
  }
}
