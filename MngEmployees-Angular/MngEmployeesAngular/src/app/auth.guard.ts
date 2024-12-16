import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
      return true;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'Please login to access this route.',
      });
      this.router.navigate(['/login']); // הפנה לדף הכניסה
      return false; // חסום גישה
    }
  }
}
