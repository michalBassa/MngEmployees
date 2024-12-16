import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employeeModel';
import { API_CONFIG } from '../apiConfig';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL = API_CONFIG.baseUrl+'/Employees';
  constructor(private _http: HttpClient) { }
  getEmployeesList(): Observable<EmployeeModel[]> {
    return this._http.get<EmployeeModel[]>(`${this.baseURL}`)
  }
  changeEmployeeToNonActivate(id: number): Observable<EmployeeModel> {
    return this._http.delete<EmployeeModel>(`${this.baseURL}/${id}`)
  }
  register(employee: EmployeeModel) {
    return this._http.post(`${this.baseURL}`, employee);
  }
  getEmployeeById(id:number): Observable<EmployeeModel>{
    return this._http.get<EmployeeModel>(`${this.baseURL}/${id}`)
  }
  updateEmployee(id:number,employee:EmployeeModel): Observable<EmployeeModel>{
    return this._http.put<EmployeeModel>(`${this.baseURL}/${id}`,employee)
  }
  
}
