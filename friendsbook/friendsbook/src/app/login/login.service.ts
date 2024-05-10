import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ILogin, userRes,LoginRes } from './login.model';

@Injectable()


export class LoginService{
   // private empUrl = "http://3.17.216.66:5000/api/auth/register";
   private UserUrl = "http://localhost:3000/api";
   
   //let URLformat:string =`${this.UserUrl}/Users/${'Niranjani'}/${'Deetya@123'}`;

    constructor(private http:HttpClient){}      
        
    loginUser(user:any[]):Observable<LoginRes>{
        let userName=JSON.parse(JSON.stringify(user)).userName;
        let password=JSON.parse(JSON.stringify(user)).password;
                
        return this.http.get<LoginRes>(`${this.UserUrl}/Users/${userName}/${password}`,{
            headers:{'Access-Control-Allow-Origin': '*'}});
    }

    getUserInfo(token:string,auth:string,image:string,role:string):Observable<userRes>{

        localStorage.setItem('Token_Number',token)
        localStorage.setItem('firstname',auth)
        localStorage.setItem('imageName',image)
        localStorage.setItem('roleType',role)
       
        return this.http.get<userRes>(`${this.UserUrl}/Users`,{
            headers:{'Access-Control-Allow-Origin': '*','x-access-token':token,'x-access-firstname':auth,
            'x-access-imageName':image, 'x-access-roleType':role,}})

    }

}

