import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { userRes } from '../../login/login.model';

@Injectable({
    providedIn: 'root'
  })
  
export class ProfileSettingService{
    // private empUrl = "http://3.17.216.66:5000/api/auth/register";
     private UserUrl = "http://localhost:3000/api";
 
     constructor(private http:HttpClient){}        
     
     getregisterUser(firstName:string):Observable<userRes[]>{
        return this.http.get<any[]>(`${this.UserUrl}/Users/${firstName}`,{
             headers:{'Access-Control-Allow-Origin': '*'}})       
     }     
     updateUser(user:any[],_id:string):Observable<any[]>{
      console.log(_id);
        return this.http.put<any[]>(`${this.UserUrl}/Users/${_id}`, user,{
            headers:{'Access-Control-Allow-Origin': '*'}})       
    }
     
 }
 
 