import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../apiConfig';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  private baseURL = API_CONFIG.baseUrl + '/User';
  login(userName: string, password: string): Observable<LoginResponse> {
    const body = { userName, password };
    return this._http.post<LoginResponse>(`${this.baseURL}`, body);
  }
  logup(userName: string, password: string): Observable<LoginResponse> {
    const body = { userName, password };
    return this._http.post<LoginResponse>(`${this.baseURL}/logUp`, body);
  }
  // loggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }
}
