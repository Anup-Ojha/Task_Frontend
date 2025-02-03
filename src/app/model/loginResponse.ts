import { Employee } from "./employee";

export interface LoginResponse {
    token: string;
    employee: Employee; 
}