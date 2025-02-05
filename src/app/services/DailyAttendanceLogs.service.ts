import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { AttendaceLogs } from "../model/DailyAttendanceLogs";
import { Observable } from "rxjs";
import { CalanderLogs } from "../model/CalendarLogs";
import { Employee } from "../model/employee";

@Injectable()
export class DailyAttendanceService implements OnInit {

    ngOnInit(): void {
        this.calData=this.getCalData();
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

    getCalData(){
        const employeeString: string = localStorage.getItem('employee'); 
        const employee: Employee = JSON.parse(employeeString);
        const employeesMainData: Employee=employee; 
        this.getCalanderLogs(employeesMainData.employeeId).subscribe((data)=>{
        
            this.calData = data;
            this.calData = this.calData.map(([lat, lng]) => ({lat, lng}));
            
            // this.calData=data

    
          // if(this.calData!=null){
          //   for(let i=0;i<this.calData.length;i++){
          //     this.eventDate.push(this.calData[i].date);
          //     this.eventTime.push(this.calData[i].timeStamp);
          //   }
          // }
        })
        return this.calData;
    }


        
      
}