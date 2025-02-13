import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Employee } from "../model/employee";

@Injectable()
export class AllEmployees{
    http=inject(HttpClient)
    
    public getAllEmployees(){
        return this.http.get<Employee[]>('http://localhost:8080/employees');
    }
}