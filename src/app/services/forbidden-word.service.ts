import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ForbiddenWord } from '../models/ForbiddenWord';
import { ServerService } from './server.service';
import {Observable} from 'rxjs';

const QUERY_PARAMETER = 'organizationId';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenWordService {
  private url = 'forbidden-words';

  constructor(private http: HttpClient, private serverService: ServerService) { }

  getForbiddenWords(organizationId: string): Observable<any> {
    const params = new HttpParams().set(QUERY_PARAMETER, organizationId);
    return this.serverService.get<ForbiddenWord[]>(this.url, params);
  }

  addForbiddenWord(newWord: string, id: string) {
    const data = {
      word: newWord,
      organizationId: id
    };
    return this.serverService.post<ForbiddenWord>(this.url, data);
  }

  deleteForbiddenWord(deleteWord: number) {
    const url = `${this.url}/${deleteWord.toString()}`;
    return this.serverService.delete(url);
  }
}
