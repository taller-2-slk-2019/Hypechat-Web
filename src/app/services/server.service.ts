import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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

  get<T>(extension, params = null) {
    return this.http.get<T>(this.baseUrl + extension, this.getParams(params)).pipe(catchError(this.handleError));
  }

  post<T>(extension, data = {}) {
    return this.http.post<T>(this.baseUrl + extension, data, this.getParams()).pipe(catchError(this.handleError));
  }

  delete(extension) {
    return this.http.delete(this.baseUrl + extension, this.getParams()).pipe(catchError(this.handleError));
  }

  put<T>(extension, data, params = null) {
    return this.http.put<T>(this.baseUrl + extension, data, this.getParams(params)).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'Error');
  }

  private getParams(params = null) {
    if (!params) {
      params = new HttpParams();
    }

    params = params.set('adminToken', 'uS3Y91RLpnpmTa7L83m6'); // TODO harcoded token, implement login

    return { params: params };
  }
}
