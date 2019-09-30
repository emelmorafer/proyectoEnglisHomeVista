import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteGeneralService {

  apiUrl = 'http://localhost:8080/homeEnglish';

  constructor(private httpClient: HttpClient) { }

  postAny(apiEndpoint: string, postData: any): Observable<any[]>{
    return this.httpClient.post<any[]>(this.apiUrl + apiEndpoint, postData);
  }

  getAny(apiEndpoint: string): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiUrl + apiEndpoint);
  }

}

