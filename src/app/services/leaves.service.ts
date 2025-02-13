import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { Leaves } from "../model/leaves";
import { StaticLeavesModel } from "../model/staticLeaves";
import { MonthCount } from "../model/CalendarLogs";

@Injectable()
export class LeaveService {
    http=inject(HttpClient)
    myStaticLeavesType:String[]=[];
    myStaticLeavesCount:Number[]=[];
    getAllStaticData(){
        this.getAllStaticLeaves().subscribe((data:StaticLeavesModel[])=>{
          data.map(leave => leave.leaveDetails).forEach(leave=>this.myStaticLeavesType.push(leave));
        })
      
        this.getCountOfStaticLeaves().subscribe((data:StaticLeavesModel[])=>{
          data.map(num=>num.numberOfLeaves).forEach(num=>this.myStaticLeavesCount.push(num));
        })
      }
    
    setEmployeeLeaves(data:Leaves){
        return this.http.post('http://localhost:8080/leaves/add',data,{responseType: 'json'}).subscribe();
    }

    getAllEmployeeLeavesData(id:Number){
        return this.http.get<Leaves[]>(`http://localhost:8080/leaves/${id}`);
    }


    fetchAndReturn(id:Number){
      return this.http.get(`http://localhost:8080/leaves/${id}`);
    }

    getAllStaticLeaves(){
        return this.http.get<any>("http://localhost:8080/staticLeaves");
    }

    getCountOfStaticLeaves(){
        return this.http.get("http://localhost:8080/staticLeaves");
    }

    getAllUserLeaveCount(id:Number){
      return this.http.get(`http://localhost:8080/leaves/count/${id}`);
    }

    getAllWeeksCount(id:Number){
      return this.http.get<any>(`http://localhost:8080/leaves/weeks/${id}`);
    }


    getFilterYearData(startDate,endDate,id){
      return this.http.get<any>(`http://localhost:8080/leaves/filterDateData/${startDate}/${endDate}/${id}`);
    }

    updateEmployeeLeaveDetails(id:Number,data:Leaves){
      return this.http.put(`http://localhost:8080/leaves/employee/update/${id}`,data);
    }

    deleteEmployeeLeaveDetails(id:Number){
      return this.http.delete(`http://localhost:8080/leaves/employee/delete/${id}`);
    }


}