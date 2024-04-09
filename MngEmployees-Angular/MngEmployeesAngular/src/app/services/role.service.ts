import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleModel } from '../models/roleModel';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient) { }
  getRolesLIst(): Observable<RoleModel[]> {
    return this._http.get<RoleModel[]>('https://localhost:7226/api/Roles')
  }
}
