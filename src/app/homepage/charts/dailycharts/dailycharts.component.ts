import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import { LeaveService } from 'src/app/services/leaves.service';

@Component({
  selector: 'app-dailycharts',
  templateUrl: './dailycharts.component.html',
  styleUrls: ['./dailycharts.component.css']
})
export class DailychartsComponent implements OnInit{
  chart: any;
  myStaticLeavesType: string[] = [];
  myLeaveCount: number[] = [];
  displayedColumns: string[] = ['date', 'progress', 'timing'];

  dataSource = [
    { date: '01-Feb-2025', progress: '80%', timing: '09:00 AM - 07:00 PM' },
    { date: '02-Feb-2025', progress: '90%', timing: '10:00 AM - 08-00PM' },
    { date: '01-Feb-2025', progress: '80%', timing: '09:00 AM - 07:00 PM' },
    { date: '02-Feb-2025', progress: '90%', timing: '10:00 AM - 08-00PM' },
    { date: '01-Feb-2025', progress: '80%', timing: '09:00 AM - 07:00 PM' },
    { date: '02-Feb-2025', progress: '90%', timing: '10:00 AM - 08-00PM' },
    { date: '01-Feb-2025', progress: '80%', timing: '09:00 AM - 07:00 PM' },
    { date: '02-Feb-2025', progress: '90%', timing: '10:00 AM - 08-00PM' },
    { date: '01-Feb-2025', progress: '80%', timing: '09:00 AM - 07:00 PM' },
    { date: '02-Feb-2025', progress: '90%', timing: '10:00 AM - 08-00PM' },
    { date: '01-Feb-2025', progress: '80%', timing: '09:00 AM - 07:00 PM' },
    { date: '02-Feb-2025', progress: '90%', timing: '10:00 AM - 08-00PM' }
  ];

  attendanceForm: FormGroup;
  timeSlots: string[] = [
    '09:00 AM - 07:00 PM',
    '10:00 AM - 08:00 PM',
    '03:00 AM - 08:00 PM',
    '02:00 AM - 07:00 PM'
  ];

  todaysDate=new Date();
  MAIN_DATE=(this.todaysDate.getFullYear()+"-"+this.todaysDate.getMonth()+"-"+this.todaysDate.getDate());
  constructor(private fb: FormBuilder,private staticLeavesData: LeaveService) {
    this.attendanceForm = this.fb.group({
      date: [this.MAIN_DATE], // Default to today's date
      loginTime: [''] // Empty by default
    });
  }

  submitForm() {
    console.log(this.attendanceForm.value);
  }

  ngOnInit(): void {
    this.staticLeavesData.getAllStaticLeaves().subscribe((data) => {
      this.myStaticLeavesType = data.map(leave => leave.leaveDetails);
      this.myLeaveCount = data.map(leave => leave.numberOfLeaves); 
      this.createChart();
    });
  }

  createChart(): void {
    const Cdata = {
      labels: this.myStaticLeavesType,
      datasets: [{
        label: 'Total Leaves',
        data: this.myLeaveCount,
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
      type: 'doughnut',
      data: Cdata,
    };
    this.chart = new Chart('MyDonughtChart', config);
  }
}
