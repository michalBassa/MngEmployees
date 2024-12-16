import { Component, Input, OnInit } from '@angular/core';
import {  DatePipe, NgFor, NgIf } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModel } from '../../../models/employeeModel';
import { RoleModel } from '../../../models/roleModel';
import { RoleService } from '../../../services/role.service';
import { HideIfEmptyDirective } from '../../../hide-if-empty.directive';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [DatePipe,HideIfEmptyDirective,NgFor],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(public activeModal:NgbActiveModal,private _roleService:RoleService){
  }

  @Input()
  employee!: EmployeeModel; // משתנה המקבל את פרטי העובד מהקומפוננטה הקוראת
  rolesList:RoleModel[]=[];


  ngOnInit(): void {
    this._roleService.getRolesLIst().subscribe({
      next: (res) => {
        this.rolesList = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  getRoleNameById(id: number): string | undefined {
    const role = this.rolesList.find(role => role.id === id);
    return role?.name;}
}
