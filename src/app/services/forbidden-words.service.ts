import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ForbiddenWords } from '../Models/forbiddenWords';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenWordsService {
  private baseUrl = environment.baseUrl + '/forbiddenWords';

  constructor(private http: HttpClient) { }

  getForbiddenWords() {
    const params = new HttpParams().set('organizationId', '1');
    return this.http.get<ForbiddenWords[]>(this.baseUrl, { params });
  }

  addForbiddenWord(newWord: string) {
    const data = {
      word: newWord,
      organizationId: '1'
    };
    return this.http.post<ForbiddenWords>(this.baseUrl, data);
  }

  deleteForbiddenWord(deleteWord: number) {
    return this.http.delete(this.baseUrl + '/' + deleteWord.toString());
  }
}
