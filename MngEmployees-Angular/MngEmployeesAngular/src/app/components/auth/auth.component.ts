import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  public logForm!: FormGroup;
  public isLoginRoute!: boolean;
  constructor(private _userService: UserService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.logForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      password: new FormControl('', [Validators.required])
    });

    this.route.url.subscribe(urlSegments => {
      this.isLoginRoute = urlSegments[0].path === 'login';
    });
  }
  save(): void {
    if (!this.isLoginRoute) {
      this.logup()
      console.log("logup")
    }
    else{
      this.login()
      console.log("login")

    }
  }
  login() {
    if (this.logForm.valid) {
      const loginData = this.logForm.value;
      this._userService.login(loginData.userName, loginData.password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Login failed! Please try again.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill all the fields correctly!',
      });
    }
  }
  logup(){
    const loginData = this.logForm.value;
    this._userService.logup(loginData.userName, loginData.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Logup failed! Please try again.',
        });
      }
    });
 
  }


}
