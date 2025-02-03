import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { Leaves } from "../model/leaves";
import { StaticLeavesModel } from "../model/staticLeaves";

@Injectable()
export class LeaveService{



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
        return this.http.get<any>(`http://localhost:8080/leaves/${id}`);
    }

    getAllStaticLeaves(){
        return this.http.get<any>("http://localhost:8080/staticLeaves");
    }

    getCountOfStaticLeaves(){
        return this.http.get<any>("http://localhost:8080/staticLeaves");
    }

}