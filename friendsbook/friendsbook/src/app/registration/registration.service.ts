import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })


export class RegistrationService{
   // private empUrl = "http://3.17.216.66:5000/api/auth/register";
    private UserUrl = "http://localhost:3000/api";

    constructor(private http:HttpClient){}     
  
   
    registerUser(user:any[],firstname:string):Observable<any[]>{
    //  console.log(firstname);
        return this.http.post<any[]>(`${this.UserUrl}/Users/${firstname}`, user,{
            headers:{'Access-Control-Allow-Origin': '*'}})       
    }
    
}

