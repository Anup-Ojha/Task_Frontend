import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginCredentials } from "../model/loginCredentials";
import { Observable } from "rxjs";
import { Employee } from "../model/employee";
import { LoginResponse } from "../model/loginResponse";

@Injectable()
export class LoginService{

    http=inject(HttpClient)

    mainEmployeeData:Employee;


    getLoggedIn(credentials: LoginCredentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>('http://localhost:8080/login', credentials);
      }
      

    getEmployeeData(){
        return this.mainEmployeeData;
    }

    setEmployeeData(obj :Employee){
        this.mainEmployeeData=obj;
    }

}