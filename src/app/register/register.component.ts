import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  singleForm: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.singleForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      hireDate: ['', Validators.required],
      managerId: ['', Validators.required],
      salary: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      accountDetails: this.fb.array([
        this.fb.group({
          accountNumber: ['', Validators.required],
          accountName: ['', Validators.required],
          ifciCode: ['', Validators.required],
          branch: ['', Validators.required],
          bankName: ['', Validators.required],
        })
      ]),
      departmentDetails: this.fb.array([
        this.fb.group({
          departmentName: ['', Validators.required],
        })
      ]),
      leavesDetails: this.fb.array([
        this.fb.group({
          leaveType: ['', Validators.required],
          fromDate: ['', Validators.required],
          tillDate: ['', Validators.required],
          note: ['', Validators.required],
          status:['Approved', Validators.required]
        })
      ]),
      assetsDetails: this.fb.array([
        this.fb.group({
          assetName: ['', Validators.required],
          assetType: ['', Validators.required]
        })
      ])
    });
  }

  get accountDetails(): FormArray {
    return this.singleForm.get('accountDetails') as FormArray;
  }

  get departmentDetails(): FormArray {
    return this.singleForm.get('departmentDetails') as FormArray;
  }

  get leavesDetails(): FormArray {
    return this.singleForm.get('leavesDetails') as FormArray;
  }

  get assetsDetails(): FormArray {
    return this.singleForm.get('assetsDetails') as FormArray;
  }

  addAccountDetail() {
    this.accountDetails.push(this.fb.group({
      accountNumber: ['', Validators.required],
      accountName: ['', Validators.required],
      ifciCode: ['', Validators.required],
      branch: ['', Validators.required],
      bankName: ['', Validators.required],
    }));
  }

  addDepartmentDetail() {
    this.departmentDetails.push(this.fb.group({
      departmentName: ['', Validators.required],
    }));
  }

  addLeaveDetail() {
    this.leavesDetails.push(this.fb.group({
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      tillDate: ['', Validators.required],
      note: ['', Validators.required],
      status:['Approved',Validators.required]
    }));
  }

  addAssetDetail() {
    this.assetsDetails.push(this.fb.group({
      assetName: ['', Validators.required],
      assetType: ['', Validators.required]
    }));
  }

  onSubmit(): void {
    if (this.singleForm.valid) {
      const formData = this.singleForm.value;
      console.log(formData);
      this.registerService.registerEmployee(formData).subscribe(response => {
        console.log('Employee registered successfully', response);
        this.router.navigate(['/login']);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  isLinear = false;
  durationInSeconds = 5;

}
