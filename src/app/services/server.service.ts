import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    return this.http.get(this.baseUrl + extension, { params }).pipe(catchError(this.handleError));
  }

  post<T>(extension, data = {}) {
    return this.http.post<ForbiddenWord>(this.baseUrl + extension, data).pipe(catchError(this.handleError));
  }

  delete(extension) {
    return this.http.delete(this.baseUrl + extension).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'Error');
  }
}
