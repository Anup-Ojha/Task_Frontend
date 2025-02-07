import { Calendar, CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AfterViewInit, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DailyAttendanceService } from 'src/app/services/DailyAttendanceLogs.service';
import { CalanderLogs } from 'src/app/model/CalendarLogs';
import { Employee } from 'src/app/model/employee';
import { timestamp } from 'rxjs';
import { LeaveService } from 'src/app/services/leaves.service';
import { Leaves, leavesCalendar } from 'src/app/model/leaves';


@Component({
  selector: 'app-calander',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit,OnChanges {

  calendarService = inject(DailyAttendanceService);
  leaveService = inject(LeaveService)
  calendarOptions: CalendarOptions;
  calData:CalanderLogs[]=[];
  emplyeeString=localStorage.getItem('employee')
  employee: Employee = JSON.parse(this.emplyeeString);
  employeesMainData: Employee = this.employee;
  leaveCalData:leavesCalendar[]=[];

  


  ngOnInit(): void {

    

      this.calendarService.getCalanderLogs(this.employeesMainData.employeeId).subscribe((data:any)=>{
        this.calData= data.map(([title, date]) => ({ title, date }));

        this.leaveService.getAllEmployeeLeavesData(this.employeesMainData.employeeId).subscribe((data)=>{
          let testLeaveCalData:Leaves[]=data;
    
          for(let i=0;i<testLeaveCalData.length;i++){
              testLeaveCalData[i]['title']=testLeaveCalData[i]['leaveType']
              testLeaveCalData[i]['start']=testLeaveCalData[i]['fromDate']
              testLeaveCalData[i]['end']=testLeaveCalData[i]['tillDate']
          }
    
          this.leaveCalData=testLeaveCalData;
          // console.log(this.leaveCalData);
          // console.log(testLeaveCalData);
        })
        this.initializeCalendar();
      })
      this.initializeCalendar();

  }

  ngOnChanges() {
    this.initializeCalendar();
  }

  initializeCalendar(): void {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        dateClick: this.handleDateClick.bind(this),
        eventSources: [this.leaveCalData,this.calData]
      };
  }


  handleDateClick(arg) {
    alert('Date clicked: ' + arg.dateStr);
  }
}
