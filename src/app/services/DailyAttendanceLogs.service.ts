import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { AttendaceLogs } from "../model/DailyAttendanceLogs";

@Injectable()
export class DailyAttendanceService {

    http=inject(HttpClient);

    getAllAttendaceLogs(id:Number){
        return this.http.get<any>(`http://localhost:8080/attendance/${id}`);
    }

    setDailyAttendance(data:AttendaceLogs){
        return this.http.post("http://localhost:8080/attendance/mark",data);
    }
}