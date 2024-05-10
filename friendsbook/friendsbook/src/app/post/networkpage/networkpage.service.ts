import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { HttpClient} from '@angular/common/http';
import {UsersList,FriendsListRes} from './networkpage.model';
import { userRes } from '../../login/login.model';


@Injectable({
    providedIn: 'root'
  })

  export class NetworkService{
    private UserPostUrl = "http://localhost:3000/api";

    constructor(private http:HttpClient){}     
  
    getFriendsList(postCount:string):Observable<userRes[]>{
      localStorage.setItem('postCount',postCount)
      return this.http.get<userRes[]>(`${this.UserPostUrl}/Users`, {
          headers:{'Access-Control-Allow-Origin': '*','x-access-postCount':postCount,}})       
  };  

   //friends requests
  requestPending(loginUser:string,requestUser:string):Observable<FriendsListRes[]>{
    return this.http.get<FriendsListRes[]>(`${this.UserPostUrl}/FriendsRequest/${loginUser}/${requestUser}`, {
        headers:{'Access-Control-Allow-Origin': '*'}})   
            
   };  

   //friends requests
  requestPendingAsperStatus(loginUser:string,requestUser:string,requestStatus:string):Observable<FriendsListRes[]>{
    return this.http.get<FriendsListRes[]>(`${this.UserPostUrl}/FriendsRequest/${loginUser}/${requestUser}/${requestStatus}`, {
        headers:{'Access-Control-Allow-Origin': '*'}})   
            
   };  

  //friends requests
  sendRequest(loginUser:string,requestUser:string,requestStatus:string):Observable<any[]>{
    const user={'sourceUser':loginUser,'requestUser': requestUser,'requestStatus':requestStatus};
    return this.http.post<any[]>(`${this.UserPostUrl}/FriendsRequest/${loginUser}/${requestUser}/${requestStatus}`, user,{
        headers:{'Access-Control-Allow-Origin': '*'}})       
}

acceptRequest(requestUser:string,loginUser:string,requestStatus:string):Observable<any[]>{
  const user={'sourceUser':loginUser,'requestUser': requestUser,'requestStatus':requestStatus};
  return this.http.put<any[]>(`${this.UserPostUrl}/FriendsRequest/${loginUser}/${requestUser}/${requestStatus}`,user, {
    headers:{'Access-Control-Allow-Origin': '*'}})
};

  

  rejectRequest(loginUser:string,requestUser:string,requestStatus:string):Observable<userRes[]>{
    const user={'sourceUser':loginUser,'requestUser': requestUser,'requestStatus':requestStatus};
    return this.http.put<any[]>(`${this.UserPostUrl}/FriendsRequest/${loginUser}/${requestUser}/${requestStatus}`,user, {
      headers:{'Access-Control-Allow-Origin': '*'}})
    };
   
}