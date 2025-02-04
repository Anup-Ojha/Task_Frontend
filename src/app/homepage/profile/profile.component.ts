import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { LoginService } from 'src/app/services/loginhttp.service';
import { Chart } from 'chart.js';
import { LeaveService } from 'src/app/services/leaves.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  employeeString: string = localStorage.getItem('employee'); 
  employee: Employee; 
  chart: any;
  myStaticLeavesType: string[] = [];
  myLeaveCount: number[] = [];
  
  constructor(private service: LoginService, private staticLeavesData: LeaveService) {}

  ngOnInit() { 
    const employee: Employee = JSON.parse(this.employeeString);
    this.employee = employee; 
    this.staticLeavesData.getAllStaticLeaves().subscribe((data) => {
      this.myStaticLeavesType = data.map(leave => leave.leaveType);
      this.myLeaveCount = data.map(leave => leave.numberOfLeaves); 
      this.pieChart('doughnut', 'pieChart', this.myStaticLeavesType, this.myLeaveCount);
      this.polarArea('polarArea','polarArea',['Late','Half Day','Full Day'],[8,10,18])
    });
  }

  pieChart(chartType: any, canvasName: any, labelValue: string[], dataValue: number[]) {
    const Cdata = {
      labels: labelValue,
      datasets: [{
        label: 'Total Leaves',
        data: dataValue,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)'
        ],
        hoverOffset: 100
      }]
    };

    const config: any = {
      type: chartType,
      data: Cdata,
    };
    this.chart = new Chart(canvasName, config);

  }


  polarArea(chartType: any, canvasName: any, labelValue: string[], dataValue: number[]){
    const data = {
      labels: labelValue,
      datasets: [{
        label: 'My First Dataset',
        data: dataValue,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)'
        ]
      }]
    };

    const config:any = {
      type: chartType,
      data: data    
    };
    this.chart= new Chart(canvasName,config);
  }
}
