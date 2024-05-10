import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { IResetPassword } from './resetpassword.model';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()

export class ResetPasswrodSevice{
    
   private UserUrl = "http://localhost:3000/api";
    
     constructor(private http:HttpClient){}  

     
     ResetPassword(user:any[]):Observable<any[]>{
      let firstName=localStorage.getItem('firstname');
     // let token=localStorage.getItem('Token_Number');
      console.log(firstName);

      return this.http.post<any[]>(`${this.UserUrl}/Users/ResetPassword/${firstName}`, user,{
         headers:{'Access-Control-Allow-Origin': '*',}});     
  }

}