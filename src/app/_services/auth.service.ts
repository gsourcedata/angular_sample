import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

import { environment } from 'src/environments/environment';

const httpOptions={
  headers:new HttpHeaders({'content-type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient ) { }

  login(email:string, password:string):Observable<any> {
    return this.http.post(environment.apiUrl + '/api-token-auth/', {
      email,
      password
    }, httpOptions);
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/users', {
      email,
      password
    }, httpOptions);
  }

}
