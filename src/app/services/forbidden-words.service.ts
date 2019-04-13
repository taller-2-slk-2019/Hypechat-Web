import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ForbiddenWords } from '../Models/forbiddenWords';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenWordsService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getForbiddenWords() {
    const params = new HttpParams().set('organizationId', '1');
    return this.http.get<ForbiddenWords[]>(this.url + '/forbiddenWords', { params });
  }

  addForbiddenWord(newWord: string) {
    const data = {
      word: newWord,
      organizationId: '1'
    };
    return this.http.post<ForbiddenWords>(this.url + '/forbiddenWords', data);
  }

  deleteForbiddenWord(deleteWord: number) {
    // return this.http.delete(this.url + '/forbiddenWords', + '/' + deleteWord);
  }
}
