import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Employee } from 'src/app/model/employee';
import { AllEmployees } from 'src/app/services/AllEmployees.service';

@Component({
  selector: 'app-orgainzation',
  templateUrl: './orgainzation.component.html',
  styleUrls: ['./orgainzation.component.css']
})
export class OrgainzationComponent implements OnInit {

  employeeService = inject(AllEmployees);
  allEmployeeData: Employee[] = [];
  options: string[] = [];
  managerIdOptions: Set<Number> = new Set<Number>;
  selected: Number = 0;


  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((data) => {
      this.allEmployeeData = data;
      for (let i = 0; i < this.allEmployeeData.length; i++) {
        this.options.push(this.allEmployeeData[i].firstName + " " + this.allEmployeeData[i].lastName);
        this.managerIdOptions.add(this.allEmployeeData[i].managerId);
      }
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  searchValueInput: string = '';
  searchText: string = '';
  filteredData: Employee[] = [];

  onSearchText(searchValue: string) {
    this.searchText = searchValue;
    this.filteredData = this.allEmployeeData.filter(data =>
      data.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.lastName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  onSearchTextManagerId(id){
    this.selected = id;
    this.allEmployeeData = this.allEmployeeData.filter(data =>
      data.managerId==this.selected
    );
  }

  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  onResetClick(){
    this.searchText=''
    this.selected=0;
    this.searchValueInput=''
  }
}
