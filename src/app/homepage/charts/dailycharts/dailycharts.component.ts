import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Chart } from 'chart.js';
import { AttendaceLogs } from 'src/app/model/DailyAttendanceLogs';
import { Employee } from 'src/app/model/employee';
import { DailyAttendanceService } from 'src/app/services/DailyAttendanceLogs.service';
import { LeaveService } from 'src/app/services/leaves.service';

@Component({
  selector: 'app-dailycharts',
  templateUrl: './dailycharts.component.html',
  styleUrls: ['./dailycharts.component.css']
})
export class DailychartsComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = ['date', 'progress','timeStamp'];

  attendanceForm: FormGroup;
  timeSlots=new Map<String,number> ();
  todaysDate=new Date();

  formatDateISO = (date) => {
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
};

// Example usage
  currentDate = new Date();
  dataSource:AttendaceLogs[]=[];  
  getmonth=this.todaysDate.getMonth()+1;
  MAIN_DATE=this.formatDateISO(this.currentDate);

  employeeString: string = localStorage.getItem('employee'); 
  employeesMainData: Employee; 
 changes:Number
  onSelectionChange(event: any) {
  const selectedKey = event.value;
  const selectedValue = this.timeSlots.get(selectedKey);
  this.attendanceForm.patchValue({ value: selectedValue });
}

displayTableData(){
  this.dailyAttendaceService.getAllAttendaceLogs(this.employeesMainData.employeeId).subscribe(
    (data) => {
      this.dataSource = data.slice(0,10);
    });
}

  constructor(private fb: FormBuilder,private staticLeavesData: LeaveService,private dailyAttendaceService:DailyAttendanceService) {
    const employee: Employee = JSON.parse(this.employeeString);
    this.employeesMainData = employee;
    this.displayTableData();

    this.timeSlots.set('09:00 AM - 07:00 PM',100);
    this.timeSlots.set('10:00 AM - 08:00 PM',100);
    this.timeSlots.set('10:00 AM - 02:00 PM (Half Day)',50);
    this.timeSlots.set('03:00 AM - 08:00 PM (Half Day)',50);
    this.timeSlots.set('02:00 AM - 07:00 PM (Half Day)',50);

    this.attendanceForm = this.fb.group({
      date: [this.MAIN_DATE],  
      timeStamp: ['',Validators.required],
      employeeId:[this.employeesMainData.employeeId,Validators.required],  
      value:['',Validators.required]
    });
  }

  submitForm() {
    this.dailyAttendaceService.setDailyAttendance(this.attendanceForm.value).subscribe();
    this.displayTableData();

  }
 
  
  
}
