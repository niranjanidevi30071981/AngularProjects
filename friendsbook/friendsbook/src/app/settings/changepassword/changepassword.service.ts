import {Injectable} from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { userRes } from '../../login/login.model';

@Injectable({
    providedIn: 'root'
  })
  
  
export class ChangePasswordService{
    // private empUrl = "http://3.17.216.66:5000/api/auth/register";
     private UserUrl = "http://localhost:3000/api";
 
     constructor(private http:HttpClient){}        
     
     UpdatePassword(user:any[],_id:string):Observable<any[]>{
      console.log(_id);
        return this.http.put<any[]>(`${this.UserUrl}/Users/${_id}`, user,{
            headers:{'Access-Control-Allow-Origin': '*'}})       
    }
     
 }
 
 