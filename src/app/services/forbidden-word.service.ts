import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ForbiddenWord } from '../models/ForbiddenWord';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenWordService {
  private baseUrl = environment.baseUrl + '/forbiddenWords';

  constructor(private http: HttpClient) { }

  getForbiddenWords() {
    const params = new HttpParams().set('organizationId', '1');
    return this.http.get<ForbiddenWord[]>(this.baseUrl, { params });
  }

  addForbiddenWord(newWord: string) {
    const data = {
      word: newWord,
      organizationId: '1'
    };
    return this.http.post<ForbiddenWord>(this.baseUrl, data);
  }

  deleteForbiddenWord(deleteWord: number) {
    return this.http.delete(this.baseUrl + '/' + deleteWord.toString());
  }
}
