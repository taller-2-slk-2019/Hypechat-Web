import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ForbiddenWord } from '../models/ForbiddenWord';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get<T>(extension, params = {}) {
    return this.http.get<T>(this.baseUrl + extension, this.getHeaders(params)).pipe(catchError(this.handleError));
  }

  post<T>(extension, data = {}) {
    return this.http.post<T>(this.baseUrl + extension, data, this.getHeaders()).pipe(catchError(this.handleError));
  }

  delete(extension) {
    return this.http.delete(this.baseUrl + extension, this.getHeaders()).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'Error');
  }

  private getHeaders(params = null) {
    let headers = new HttpHeaders().set('adminToken', 'uS3Y91RLpnpmTa7L83m6'); //TODO harcoded token, implement login

    let result: any = {headers: headers};
    if (params){
      result.params = params;
    }
    return result;
  } 
}
