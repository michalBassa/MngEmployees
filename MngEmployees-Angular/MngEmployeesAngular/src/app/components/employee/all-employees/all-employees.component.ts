import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgModel } from '@angular/forms';
import 'bootstrap';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employeeModel';

@Component({
  selector: 'app-all-employees',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.scss'
})
export class AllEmployeesComponent implements OnInit  {
  public employeesList: EmployeeModel[] = [];
  public filteredEmployeesList: EmployeeModel[] = [];
  public searchText: string = '';
  constructor(private _employeeService:EmployeeService , private router: Router) {}
  ngOnInit():void {
    this._employeeService.getEmployeesList().subscribe({
      next: (res) => {
       console.log("res",res)
      this.employeesList= res.filter(e=>e.activityStatus);// רק עובדים פעילים
        this.filteredEmployeesList = [...this.employeesList]; // בתחילה, הרשימה המסוננת היא זהה לרשימה המלאה
        console.log("filter",this.filteredEmployeesList)
      },
      error: (err) => {
        console.log(err);
      }
    });
   }
    
 // פונקציה לסינון הרשימה בהתאם לטקסט שהוזן בשדה החיפוש
  filterEmployeesList(): void {
    if (!this.searchText) {
      // אם שדה החיפוש ריק, הצג את כל העובדים
      this.filteredEmployeesList = [...this.employeesList];
    } else {
      // אחרת, סנן את הרשימה לפי טקסט החיפוש באחת השדות
      this.filteredEmployeesList = this.employeesList.filter((employee) => {
        return (
          employee.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          employee.tz.toLowerCase().includes(this.searchText.toLowerCase())  
       )
      });
    }
  }
  // async deleteEmployee(employee: EmployeeModel) {
  //   const isConfirmed = await Swal.fire({
  //     title: "Are you sure ?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => result.isConfirmed);
  //   if (isConfirmed) {
  //     await this._employeeService.changeEmployeeToNonActivate(employee.id);
  //     this.filteredEmployeesList = this.filteredEmployeesList.filter(
  //       (filteredEmployee) => filteredEmployee.id !== employee.id
  //     );
  //     Swal.fire({
  //       title: "Deleted!",
  //       text: "Your file has been deleted.",
  //       icon: "success"
  //     });
  //   }
  // }


  deleteEmployee(employee: EmployeeModel)  {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
          this._employeeService.changeEmployeeToNonActivate(employee.id).subscribe({
            next: (res) => {
                Swal.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                );
                this.filteredEmployeesList = this.filteredEmployeesList.filter(//מכוער!!!
                         (filteredEmployee) => filteredEmployee.id !== employee.id);
            },
            error: (err) => {
                console.log(err);
            }
        })
        }
    });
    
}
  
 exportToExcel() {
  const worksheet = xlsx.utils.json_to_sheet(this.filteredEmployeesList);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Employees');
  xlsx.writeFile(workbook, 'employees_data.xlsx');
}
addEmployee(){
  this.router.navigate(['/employees/add-employee']);
}
editEmployee(id:number){
      this.router.navigate(['/employees/edit-employee',id]);
}



}