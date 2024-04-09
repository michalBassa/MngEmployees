import { EmployeeRoleModel } from "./employeeRoleModel"

export class EmployeeModel{
  id!:number
  tz!:string  
  firstName!: string  
  lastName!:string  
  birthDate!:Date
  gender!:number
  startWorkDate!: Date  
  activityStatus!:boolean
  employeeRoles:EmployeeRoleModel[]=[]
}