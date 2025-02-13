import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';



@Component({
  selector: 'app-sidebar',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  loading:boolean=false;
  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  on=true;

  constructor(iconRegistry: MatIconRegistry, private router:Router) {
    this.loading=true


    // console.log(localStorage.getItem('token')); // ✅ Get token from localStorage
    this.loading=false

  }
    drawerOpened = true; // Initially open
    dataEmp=localStorage.getItem('employee');
    employee: Employee = JSON.parse(this.dataEmp);
  
    navigateToProfile() {
      this.router.navigate(['home/profile']);
      this.on=false;
    }
  
    navigateToGroup() {
      this.router.navigate(['home/group']);
      this.on=false;

    }
  
    navigateToSettings() {
      this.router.navigate(['logout']);
      this.on=false;
    }

    navigateToMenu(){
      this.router.navigate(["home"]);
      this.on=true;
    }

    navigateToOrganinzation(){
      this.router.navigate(['home/organization']);
      this.on=false;
    }
  }
  
