import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { Employee } from 'src/app/model/employee';
import { FullLeaveObj, LeaveCount } from 'src/app/model/LeaveDetailsCount';
import { Leaves } from 'src/app/model/leaves';
import { StaticLeavesModel } from 'src/app/model/staticLeaves';
import { LeaveService } from 'src/app/services/leaves.service';
import { LoginService } from 'src/app/services/loginhttp.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit{

  leaveService=inject(LeaveService)

  leaveForm: FormGroup;

  constructor(private fb: FormBuilder,private loginService:LoginService,private router:Router) {}
  
  currentEmployee:Employee=this.loginService.getEmployeeData();
  employeeString: string = localStorage.getItem('employee'); 
  employeesMainData: Employee; 
  leaveDetails:Leaves[]=[];
  
  ngOnInit(): void {

    try {
      const employee: Employee = JSON.parse(this.employeeString);
      this.employeesMainData = employee; 
    } catch (error) {
      console.error("Error parsing employee data:", error);
    }

    this.getAllStaticLeaves();
    
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      tillDate: ['', Validators.required],
      status: ['', Validators.required],
      note: [''],
      employee: this.fb.group({ 
        employeeId: [this.employeesMainData.employeeId, Validators.required]
      })
    });
    setTimeout(()=>{
      this.fetchLeaveDetails()
    },500)
  }

  leaveData:Leaves
  onSubmit(): void {
    if (this.leaveForm.valid) {
      this.leaveData=this.leaveForm.value;
      this.leaveService.setEmployeeLeaves(this.leaveData);
    }
    
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      tillDate: ['', Validators.required],
      status: ['', Validators.required],
      note: [''],
      employee: this.fb.group({ 
        employeeId: [this.employeesMainData.employeeId, Validators.required]
      })
    });
    this.getAllStaticLeaves()
    setTimeout(()=>{
    this.fetchLeaveDetails()
    this.getAllStaticLeaves()
    },1000)
    this.getAllStaticLeaves()

  }

fetchLeaveDetails(): void {
  this.leaveService.getAllEmployeeLeavesData(this.employeesMainData.employeeId).subscribe((data)=>{
    this.leaveDetails=data.reverse().slice(0,7);
  })
  }

   myStaticLeaves:FullLeaveObj[]=[];
   myUser:LeaveCount[]=[];
   myAvailableLeaves:number[]=[];

  getAllStaticLeaves(){
      this.leaveService.getAllUserLeaveCount(this.employeesMainData.employeeId).subscribe((data:LeaveCount[])=>{
      this.myUser=data;
      // for(let i=0;i<this.myUser.length;i++){
      //     if(this.myUser[i].)
      // }
      })
    
      this.leaveService.getAllStaticLeaves().subscribe((data:StaticLeavesModel[]) => {  
        this.myStaticLeaves = data;
        this.myStaticLeaves.sort();
        this.myUser.sort();
        

          if(this.myStaticLeaves!=null){
            for(let i=0;i<this.myStaticLeaves.length;i++){
              delete this.myStaticLeaves[i].id;
              delete this.myStaticLeaves[i].leaveDetails;
        }
      }
      for(let i=0;i<this.myStaticLeaves.length;i++){
        for(let j=0;j<this.myUser.length;j++){
          if(this.myStaticLeaves[i].leaveType==this.myUser[j].type){
            this.myStaticLeaves[i].numberOfLeaves=this.myStaticLeaves[i].numberOfLeaves - this.myUser[j].COUNT;
          }
        }      
    }

  })

  


  }
}