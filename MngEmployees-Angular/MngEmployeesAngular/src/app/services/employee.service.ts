import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employeeModel';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }
  getEmployeesList(): Observable<EmployeeModel[]> {
    return this._http.get<EmployeeModel[]>('https://localhost:7226/api/Employees')
  }
  changeEmployeeToNonActivate(id: number): Observable<EmployeeModel> {
    return this._http.delete<EmployeeModel>(`https://localhost:7226/api/Employees/${id}`)
  }
  register(employee: EmployeeModel) {
    return this._http.post('https://localhost:7226/api/Employees', employee);
  }
  getEmployeeById(id:number): Observable<EmployeeModel>{
    return this._http.get<EmployeeModel>(`https://localhost:7226/api/Employees/${id}`)
  }
  updateEmployee(id:number,employee:EmployeeModel): Observable<EmployeeModel>{
    console.log("updateEmployee",id)
    return this._http.put<EmployeeModel>(`https://localhost:7226/api/Employees/${id}`,employee)
  }
  
}
