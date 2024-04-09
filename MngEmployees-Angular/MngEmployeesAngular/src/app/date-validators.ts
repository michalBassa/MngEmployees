import { AbstractControl, ValidationErrors } from '@angular/forms';

export class DateValidators {
    
  static validateStartWorkDate(control: AbstractControl): ValidationErrors | null {
    const startDate = new Date(control.value);
    const dateOfBirth = new Date(control.parent?.get('birthDate')?.value);
  
    if (startDate <= dateOfBirth) {
      return { startDateBeforeBirth: 'Start date must be after date of birth' };
    }
  
    return null;
  }
  
 static validateBirthDate(control: AbstractControl): ValidationErrors | null {
    const dateOfBirth = new Date(control.value);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  
    if (dateOfBirth >= eighteenYearsAgo) {
      return { dateOfBirthInvalid: true };
    }
    return null;
  }
  
//  static validatestartDateRole(control: AbstractControl, startWorkDate: Date): ValidationErrors | null {
//     const startDateRole = new Date(control.value);
  
//     if (startDateRole < startWorkDate) {
//       return { startDateRoleInvalid: true };
//     }
  
//     return null;
//   }
  

}
