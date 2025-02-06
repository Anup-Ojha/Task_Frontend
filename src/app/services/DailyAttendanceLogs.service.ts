import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { AttendaceLogs } from "../model/DailyAttendanceLogs";
import { Observable } from "rxjs";
import { CalanderLogs } from "../model/CalendarLogs";
import { Employee } from "../model/employee";
import { Calendar } from "@fullcalendar/core";

@Injectable()
export class DailyAttendanceService implements OnInit {

    ngOnInit(): void {
        this.calData=this.getCalDataInService();
    }

    http=inject(HttpClient);
    calData:any;

    getAllAttendaceLogs(id:Number){
        return this.http.get<any>(`http://localhost:8080/attendance/${id}`);
    }

    setDailyAttendance(data:AttendaceLogs){
        return this.http.post("http://localhost:8080/attendance/mark",data);
    }

    getCalanderLogs(id:Number){
        return this.http.get(`http://localhost:8080/at/${id}`);
    }

    getCalDataInService(){
        const employeeString: string = localStorage.getItem('employee'); 
        const employee: Employee = JSON.parse(employeeString);
        const employeesMainData: Employee=employee; 
        var mydata;
        this.getCalanderLogs(employeesMainData.employeeId).subscribe((data)=>{
        
            mydata = data;
            mydata = mydata.map(([events, date]) => ({events, date}));
          // this.calData=data
          // if(this.calData!=null){
          //   for(let i=0;i<this.calData.length;i++){
          //     this.eventDate.push(this.calData[i].date);
          //     this.eventTime.push(this.calData[i].timeStamp);
          //   }
          // }
        })
        return mydata;
    }

    getCalData(){
        return this.calData=this.getCalDataInService();
    }
        
      
}