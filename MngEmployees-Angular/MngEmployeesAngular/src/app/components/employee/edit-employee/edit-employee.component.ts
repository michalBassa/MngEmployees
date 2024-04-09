import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RoleModel } from '../../../models/roleModel';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employeeModel';
import { CommonModule, formatDate } from '@angular/common';
import { GenderPipe } from '../../../gender.pipe';
import Swal from 'sweetalert2';
import { EmployeeRoleModel } from '../../../models/employeeRoleModel';
import { DateValidators } from '../../../date-validators';


@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,GenderPipe],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent {
  constructor (private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private router :Router ,
    private _roleService:RoleService,
    private _employeeSrvice:EmployeeService
     ){}
  public editEmployeeForm!: FormGroup;
 public rolesList: RoleModel[] = [];
  public byId!:number;
  roleGroups: FormGroup[] = [];
  public employee!:EmployeeModel
  ngOnInit(): void {
   this.initForm();
    this.getRoles();
   this.getEmployeeById();
  }

  initForm(): void {
    this.editEmployeeForm = this.formBuilder.group({
      tz: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Zא-ת]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Zא-ת]+$')]],
      birthDate: ['', [Validators.required, DateValidators.validateBirthDate]],
      gender: ['', Validators.required],
      startWorkDate: ['', Validators.required],
      activityStatus: ['', Validators.required],
      employeeRoles:this.formBuilder.array([])
      });

  }
  getRoles() {
    this._roleService.getRolesLIst().subscribe({
      next: (res) => {
          this.rolesList = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getEmployeeById(): void {
    this.route.params.subscribe(param=>{
      this.byId=param['id'] })
      this._employeeSrvice.getEmployeeById(this.byId).subscribe({
        next: (res) => {
          this.employee = res
          this.editEmployeeForm.patchValue({
            tz: this.employee.tz,
            firstName: this.employee.firstName,
            lastName: this.employee.lastName,
            birthDate: formatDate(this.employee.birthDate, 'yyyy-MM-dd', 'en-US'),
            gender: this.employee.gender, 
            startWorkDate: formatDate(this.employee.startWorkDate, 'yyyy-MM-dd', 'en-US'),
            employeeRoles: this.employee.employeeRoles,
            activityStatus:this.employee.activityStatus
          });
          this.employee.employeeRoles.forEach(r => {
            const roleForm = this.createRoleFormGroup(r); // יצירת FormGroup עבור התפקיד
            this.roleGroups.push(roleForm); // הוספת התפקיד לתוך roleForms
          });
        },
        error: (err) => {
          console.log(err);
        }
      })

  }
 
  createRoleFormGroup(roleData: EmployeeRoleModel): FormGroup {
    return this.formBuilder.group({
      roleId: [roleData.roleId, [this.validateRoleId.bind(this)]], // Add validation for positionId
      isManagerialRole : [roleData.isManagerialRole],
      startDateRole: [formatDate(roleData.startDateRole, 'yyyy-MM-dd', 'en-US'),[Validators.required, this.validatestartDateRole.bind(this)]]
    });
  }
  
  validateRoleId(control: AbstractControl): ValidationErrors | null {
    const roleId = control.value;
    const existinRoles = this.roleGroups
      .filter(group => group !== control.parent) // Exclude current group
      .map(group => group.value.roleId);
    // Check if the control is dirty and if the role exists in other groups
    if (control.dirty && existinRoles.includes(roleId)) {
      return { roleAlreadyExists: 'Role already exists in the list' };
    }
    return null;
  }
  validatestartDateRole(control: AbstractControl): ValidationErrors | null {
    const startDateRole = new Date(control.value);
    const startWorkDate = new Date(this.editEmployeeForm.get('startWorkDate')?.value);

    if (startDateRole < startWorkDate) {
      return { startDateRoleInvalid: true };
    }

    return null;
  }

  addRole(): void {
    const roleForm = this.formBuilder.group({
      roleId: ['', [Validators.required, this.validateRoleId.bind(this)]],
      isManagerialRole: [false],
      startDateRole: ['', [Validators.required, this.validatestartDateRole.bind(this)]]
    });
    roleForm.get('startDateRole')?.valueChanges.subscribe((value) => {
      if (value) {
        const formattedDate = new Date(value); // המרת המחרוזת לתאריך מסוג Date
        roleForm.get('startDateRole')?.setValue(this.formatDate(formattedDate), { emitEvent: false });
      }
    });
        this.roleGroups.push(roleForm);
  }
  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
  deleteRole(index: number): void {
    this.roleGroups.splice(index, 1);
  }
  
  
  isInvalid(): boolean {
    return this.editEmployeeForm.invalid || this.roleGroups.length === 0 || this.roleGroups.some(group => group.invalid);
  }


  updateEmployee(): void {
    if (this.editEmployeeForm.valid) {
      const employeeData: EmployeeModel = this.editEmployeeForm.value;
      //employeeData.startWorkDate = this.formatDate(this.editEmployeeForm.value.startWorkDate);// Formatting startDate
     // employeeData.birthDate = this.formatDate(this.editEmployeeForm.value.birthDate); // Formatting dateBirth
      const roles: EmployeeRoleModel[] = this.roleGroups.map(group => group.value);
      employeeData.employeeRoles = roles;
      console.log("employeeData", employeeData);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save the changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FF69B4',
      cancelButtonColor: '#FFFFFF',
      background: '#FFFFFF',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._employeeSrvice.updateEmployee( this.byId,employeeData)
        .subscribe(() => {
          //this.dialogRef.close()
          Swal.fire({
            title: 'Employee updated successfully!',
            text: 'The employee has been updated successfully.',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            background: '#FFFFFF',
            iconColor: '#FF69B4'
          }).then(() => {
             this.router.navigate(['employees']); 
          });
        }, (error) => {
          // Handle errors during update
          console.error('Error updating employee:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while saving changes.',
            icon: 'error',
            confirmButtonColor: '#FF69B4',
            background: '#FFFFFF'
          });
        });
      }
    });
  }
}

}

