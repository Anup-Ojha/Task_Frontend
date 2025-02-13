import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/model/loginCredentials';
import { LoginService } from 'src/app/services/loginhttp.service';
import { Employee } from '../model/employee';
import { HttpHeaders, HttpClient } from '@angular/common/http'; // Import HttpClient and HttpHeaders

interface LoginResponse {  // Define the LoginResponse interface
  token: string;
  employee: Employee;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  value='';
  service = inject(LoginService);
  reactiveForm!: FormGroup; // Use definite assignment assertion (!)
  loginData!: LoginCredentials; // Use definite assignment assertion (!)
  employeeData!: Employee; // Use definite assignment assertion (!)
  httpClient = inject(HttpClient); // Inject HttpClient
  authService = inject(LoginService); // Inject LoginService

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      username: new FormControl(null, [Validators.required]), 
      password: new FormControl(null, [Validators.required])  
    });
  }


  onFormSubmit() {
    if (this.reactiveForm.valid) {
      this.loginData = this.reactiveForm.value as LoginCredentials;
  
      this.authService.getLoggedIn(this.loginData).subscribe({
        next: (response: any) => { 
          localStorage.clear();
          localStorage.setItem('token', response.token);
          localStorage.setItem('employee', JSON.stringify(response.employee));
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error("Login error:", error);
          alert("Invalid credentials. Please try again.");
        }
      });
    } else {
      alert("Please fill in all required fields.");
    }
    this.autoLogout()
  }
  


  goToRegister() {
    this.router.navigate(['/register']);
  }


  autoLogout(){
    setTimeout(()=>{
    location.reload()
      this.router.navigate(['/logout']);
    },30*60*1000)
  }
}
