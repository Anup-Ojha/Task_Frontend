import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { Employee } from 'src/app/model/employee';
import { FullLeaveObj, LeaveCount } from 'src/app/model/LeaveDetailsCount';
import { Leaves } from 'src/app/model/leaves';
import { StaticLeavesModel } from 'src/app/model/staticLeaves';
import { LeaveService } from 'src/app/services/leaves.service';
import { LoginService } from 'src/app/services/loginhttp.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AttendaceLogs } from 'src/app/model/DailyAttendanceLogs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, AfterViewInit {
  loading:boolean=true;
  leaveService = inject(LeaveService);
  leaveForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router,private dialog: MatDialog) {}

  currentEmployee: Employee = this.loginService.getEmployeeData();
  employeeString: string = localStorage.getItem('employee');
  displayedColumns: string[] = ['Leave Type', 'From Date', 'Till Date', 'Status', 'Note','Action'];
  employee: Employee = JSON.parse(this.employeeString);
  employeesMainData: Employee = this.employee;
  leaveDetails: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngAfterViewInit() {
  }

  ngOnInit(): void {
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
      this.fetchLeaveDetails();
      this.loading=false;
    },1000)
 

  }

  leaveData: Leaves;
  onSubmit(): void {
    if (this.leaveForm.valid) {
      this.leaveData = this.leaveForm.value;
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
    this.getAllStaticLeaves();
    this.fetchLeaveDetails();
    this.fetchLeaveDetails();
    this.getAllStaticLeaves();


  }

  fetchLeaveDetails() {
    this.leaveService.getAllEmployeeLeavesData(this.employeesMainData.employeeId).subscribe((data: Leaves[]) => {
      this.leaveDetails.data = data.reverse();
      this.leaveDetails.paginator=this.paginator;
    });
  }  

   myStaticLeaves:FullLeaveObj[]=[];
   myUser:LeaveCount[]=[];
   myAvailableLeaves:number[]=[];

  getAllStaticLeaves(){
      this.leaveService.getAllUserLeaveCount(this.employeesMainData.employeeId).subscribe((data:LeaveCount[])=>{
      this.myUser=data;
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



  showDialog(emp:Leaves){
    this.dialog.open(EditDialogComponent,{
      width: '550px',
      height: '500px',
      data:emp,
    });
    this.dialog.afterAllClosed.subscribe((res)=>{
      console.log(res)
        this.ngOnInit();
    })
  }
  


}