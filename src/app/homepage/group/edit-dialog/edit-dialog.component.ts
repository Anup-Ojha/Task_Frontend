import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee';
import { Leaves } from 'src/app/model/leaves';
import { LeaveService } from 'src/app/services/leaves.service';
import { GroupComponent } from '../group.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  leaveUpdateForm: FormGroup;
  employeeString: string = localStorage.getItem('employee');
    employee: Employee = JSON.parse(this.employeeString);
    employeesMainData: Employee = this.employee;
  myStaticLeaves:String[]=["Paid Leaves","Casual Leaves","Floater Leaves","Festive Leaves","Emergency Leaves"]
  constructor(private router:Router,private fb: FormBuilder,private dialog: MatDialogRef<EditDialogComponent>,@Inject(MAT_DIALOG_DATA) public emp: Leaves,private leaveService:LeaveService) {
      
    this.leaveUpdateForm = this.fb.group({
          leaveType: [emp.leaveType, Validators.required],
          fromDate: [emp.fromDate, Validators.required],
          tillDate: [emp.tillDate, Validators.required],
          status: [emp.status, Validators.required],
          note: [emp.note],
          id:[emp.id],
          employee: this.fb.group({
            employeeId: [this.employeesMainData.employeeId, Validators.required]
          })
        });
  }


  onSubmit(){
    if (this.leaveUpdateForm.valid) {
    let leaveData: Leaves;
      leaveData = this.leaveUpdateForm.value;
      this.leaveService.updateEmployeeLeaveDetails(leaveData.id,leaveData).subscribe((res)=>{
        console.log(res)
      });
    }
    setTimeout(()=>{
      this.dialog.close();
    },1000);
      
  }
  

  deleteData(id:Number){
    if(confirm('Are sure you want to delete this request ?')){
    this.leaveService.deleteEmployeeLeaveDetails(id).subscribe((res)=>{
      this.dialog.close()
    })
  }
  }


}
