import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeesComponent } from '../components/employee/all-employees/all-employees.component';
import { EditEmployeeComponent } from '../components/employee/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from '../components/employee/add-employee/add-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-employees', pathMatch: 'full' },
  { path: 'all-employees', component: AllEmployeesComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class EmployeeModule { }
