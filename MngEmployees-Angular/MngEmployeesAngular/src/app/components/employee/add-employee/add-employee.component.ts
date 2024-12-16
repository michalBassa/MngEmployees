import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RoleModel } from '../../../models/roleModel';
import { RoleService } from '../../../services/role.service';
import {  OnInit } from '@angular/core';
import { EmployeeRoleModel } from '../../../models/employeeRoleModel';
import { EmployeeModel } from '../../../models/employeeModel';
import { DateValidators } from '../../../date-validators';
     

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  rolesList: RoleModel[] = [];
  roleGroups: FormGroup[] = [];
  showRoleFields = false;

  constructor(
    private _employeeService: EmployeeService,
    private _roleService: RoleService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._roleService.getRolesLIst().subscribe({
      next: (res) => {
        this.rolesList = res;
        console.log(this.rolesList)
      },
      error: (err) => {
        console.error(err);
      }
    });
    
    this.addEmployeeForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Zא-ת]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Zא-ת]+$')]],
      tz: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      startWorkDate: ['', [Validators.required, DateValidators.validateStartWorkDate]],
      birthDate: ['', [Validators.required, DateValidators.validateBirthDate]],
      gender: [1, [Validators.required]],
      activityStatus: [true, Validators.required],
    });
  }

  
  validatestartDateRole(control: AbstractControl): ValidationErrors | null {
    const startDateRole = new Date(control.value);
    const startWorkDate = new Date(this.addEmployeeForm.get('startWorkDate')?.value);

    if (startDateRole < startWorkDate) {
      return { startDateRoleInvalid: true };
    }

    return null;
  }
  
  addRole(): void {
    const roleForm = this._formBuilder.group({
      roleId: ['', [Validators.required, this.validateroleId.bind(this)]],
      isManagerialRole: [false],
      startDateRole: ['', [Validators.required ,this.validatestartDateRole.bind(this)]]
    });

    roleForm.get('startDateRole')?.valueChanges.subscribe((value) => {
      if (value) {
        const formattedDate = new Date(value);
        roleForm.get('startDateRole')?.setValue(this.formatDate(formattedDate), { emitEvent: false });
      }
    });
    this.roleGroups.push(roleForm);
    this.showRoleFields = true;
  }

  validateroleId(control: AbstractControl): ValidationErrors | null {
    const roleId = control.value;
    const existingRoles = this.roleGroups.map(group => group.value.roleId);
    if (control.dirty && existingRoles.includes(roleId)) {
      return { roleAlreadyExists: 'Role already exists in the list' };
    }
    return null;
  }

  addEmployee(): void {
    const employeeData: EmployeeModel = this.addEmployeeForm.value;
    const roles: EmployeeRoleModel[] = this.roleGroups.map(group => group.value);
    employeeData.employeeRoles = roles;

    this._employeeService.register(employeeData).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Thank you!',
          text: 'The employee was successfully added!',
          icon: 'success'
        });
        this._router.navigate(['employees']);
       
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This employee already exists!",
        });
      }
    });
  }

  isInvalid(): boolean {
    return this.addEmployeeForm.invalid || this.roleGroups.length === 0 || this.roleGroups.some(group => group.invalid);
  }

  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }




}


  