import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { AuthComponent } from './components/auth/auth.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'home',component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'login',component:AuthComponent},
    {path:'logup',component:AuthComponent},
    {path:'logout',component:LogoutComponent},
    { path: 'employees', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) ,
        canActivate:[AuthGuard]
    },
    { path: '**', component: NotFoundComponent }
];


    

