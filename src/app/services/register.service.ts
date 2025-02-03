import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/register';

  constructor(private http: HttpClient) { }

  registerEmployee(employeeData: Employee) {
    return this.http.post(this.apiUrl, employeeData,{responseType: 'text'});
  }
}
