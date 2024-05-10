import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { HttpClient, HttpRequest, HttpEvent ,HttpHeaders} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })

  export class HomeService{
    private UserPostUrl = "http://localhost:3000/post";
    private networkUrl = "http://localhost:3000/api";

    constructor(private http:HttpClient){}     
  
    
    userPostDeatils(file: File,userName:string):Observable<any[]>{

      const formData = new FormData();
      formData.append('profile', file);
      formData.append('username', userName);

        return this.http.post<any[]>(`${this.UserPostUrl}/upload`, formData,{
            headers:{'Access-Control-Allow-Origin': '*'}})       
    }  

    getUserPostDeatils(userName:string):Observable<any[]>{
     // console.log(`${this.UserPostUrl}/postlist/niranjani`);
      return this.http.get<any[]>(`${this.UserPostUrl}/postlist/${userName}`, {
          headers:{'Access-Control-Allow-Origin': '*'}})       
  };  

  
  getUserConnectionDeatils(userName:string):Observable<any[]>{
    // console.log(`${this.UserPostUrl}/postlist/niranjani`);
     return this.http.get<any[]>(`${this.networkUrl}/FriendsRequest/${userName}`, {
         headers:{'Access-Control-Allow-Origin': '*'}})       
 };  

    getPostImage(fileName:string):Observable<any[]>{
       console.log(`${this.UserPostUrl}/images/${fileName}`);
      return this.http.get<any[]>(`${this.UserPostUrl}/images/${fileName}`, {
          headers:{'Access-Control-Allow-Origin': '*',}})       
  };  

  }