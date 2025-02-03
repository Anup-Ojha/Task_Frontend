import { Component, inject, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { LoginService } from 'src/app/services/loginhttp.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  
  employeeString: string = localStorage.getItem('employee'); 
  employee: Employee; 
  
  constructor(private service: LoginService) { }
  
  ngOnInit() { 
      try {
        const employee: Employee = JSON.parse(this.employeeString);
        this.employee = employee; 
      } catch (error) {
        console.error("Error parsing employee data:", error);
      }
  }
  
}
