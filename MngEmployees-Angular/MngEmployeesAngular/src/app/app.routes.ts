import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'employees', pathMatch: 'full' },
    { path: 'employees', loadChildren: () => import('./components/employee/employee/employee.module').then(m => m.EmployeeModule) },
    { path: '**', component: NotFoundComponent }
];


    

