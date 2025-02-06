import { Component, inject, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { AllEmployees } from 'src/app/services/AllEmployees.service';

@Component({
  selector: 'app-orgainzation',
  templateUrl: './orgainzation.component.html',
  styleUrls: ['./orgainzation.component.css']
})
export class OrgainzationComponent implements OnInit {

  employeeService=inject(AllEmployees);
  allEmployeeData:Employee[]=[];

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((data)=>{
      this.allEmployeeData=data;
    })
  }

}
