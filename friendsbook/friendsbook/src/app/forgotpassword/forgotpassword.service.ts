import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import {IForgotPassword} from './forgotpassword.model';

@Injectable()


export class ForgotPasswordService{
   // private empUrl = "http://3.17.216.66:5000/api/auth/register";
   private UserUrl = "http://localhost:3000/api";

    constructor(private http:HttpClient){}  
  
    forgotPassword(forgotUser:any[]):Observable<any[]>{

        let email=JSON.parse(JSON.stringify(forgotUser)).email;
        let DOB=JSON.parse(JSON.stringify(forgotUser)).dob;

       // console.log(`${this.UserUrl}/Users/ForgotPassword/${email}/${DOB}`)

        return this.http.get<any[]>(`${this.UserUrl}/Users/ForgotPassword/${email}/${DOB}`,{
            headers:{'Access-Control-Allow-Origin': '*'}});
    }
    
}

