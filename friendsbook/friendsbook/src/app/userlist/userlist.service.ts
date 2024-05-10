import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { userRes} from '../login/login.model';

@Injectable()


export class UserListService{
   // private empUrl = "http://3.17.216.66:5000/api/auth/register";
   private UserUrl = "http://localhost:3000/api";
   
   
    constructor(private http:HttpClient){}  
    getUserInfo(token:string,auth:string,image:string):Observable<userRes[]>{

           return this.http.get<userRes[]>(`${this.UserUrl}/Users`,{
            headers:{'Access-Control-Allow-Origin': '*','x-access-token':token,'x-access-firstname':auth,
            'x-access-imageName':image,}})

    }

    updateUser(user:any[],_id:string):Observable<any[]>{
         console.log(user);
           return this.http.put<any[]>(`${this.UserUrl}/Users/${_id}`, user,{
               headers:{'Access-Control-Allow-Origin': '*'}})       
       }
 

}

