import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ForbiddenWord } from '../models/ForbiddenWord';
import { ServerService } from './server.service';
import {Observable} from 'rxjs';

const SLASH = '/';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenWordService {
  private extension = '/forbiddenWords';

  constructor(private http: HttpClient, private serverService: ServerService) { }

  getForbiddenWords(): Observable<any> {
    const params = new HttpParams().set('organizationId', '1');
    return this.serverService.get<ForbiddenWord[]>(this.extension, params);
  }

  addForbiddenWord(newWord: string) {
    const data = {
      word: newWord,
      organizationId: '1'
    };
    return this.serverService.post(this.extension, data);
  }

  deleteForbiddenWord(deleteWord: number) {
    const extension = this.extension + SLASH + deleteWord.toString();
    return this.serverService.delete(extension);
  }
}
