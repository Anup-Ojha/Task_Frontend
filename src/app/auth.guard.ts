import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    this.autoLogout()
  }

  autoLogout(){
    setTimeout(()=>{
      this.router.navigate(['logout']);
    },30 * 60 * 1000)
  }

}

