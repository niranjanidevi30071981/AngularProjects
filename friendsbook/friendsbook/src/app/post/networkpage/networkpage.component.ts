import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpEventType,HttpResponse } from '@angular/common/http';
import { LoginService } from 'src/app/login/login.service';
import { userRes } from '../../login/login.model';
import {UsersList,FriendsListRes,networkUserRes} from './networkpage.model';
import {NetworkService} from './networkpage.service'
import {HomeService} from '../home/home.service';

@Component({
  selector: 'app-networkpage',
  templateUrl: './networkpage.component.html',
  styleUrls: ['./networkpage.component.css']
})
export class NetworkpageComponent implements OnInit{  
  
  token:string|null = '';
  auth:string|null ='';
  role:string|null='';
  imageName:string|null='';
  connectionsCount:string|null='0';
  postsCount:number=0;
  userImage:string='';
  Users:UsersList[]=[];
  FriendsListStatus:FriendsListRes[]=[];
  NetworkUserResponse:networkUserRes[]=[]
  RequestStatus:string[]=['SEND','ACCEPT','REJECT'];
  RequestPendingStatus:boolean=true;
  RequestSendingStatus:boolean=false;
  RequestAcceptStatus:boolean=true;
  RequestRejectStatus:boolean=true;


  userInfo:userRes[]=[{
    "_id":"",
    "firstname":"",
    "lastname":"",
    "email":"",
    "password":"",
    "DOB":"",
    "gender":"",
    "phoneno":"",
    "role":"",
    "image":"",
    "address":"",
    "city":"",
    "state":"",
    "country":"",
    "accountBlock":false,
    "createdAt":"",
    "updatedAt":"",     
    "__v":0   
  }];

   constructor(private loginService:LoginService,private networkService:NetworkService,private homeService:HomeService,
    private router:Router){}

    ngOnInit(): void {
      //token validation
      this.token = localStorage.getItem('Token_Number');
      this.auth = localStorage.getItem('firstname');      
      this.imageName = localStorage.getItem('imageName');
      this.connectionsCount=localStorage.getItem('ConnectionsCount');
     
      this.role=localStorage.getItem('roleType');

      this.loginService.getUserInfo(this.token?this.token:'',this.auth?this.auth:'',
      this.imageName?this.imageName:'',this.role?this.role:'')
      .subscribe((res:userRes) => {
       // this.userInfo = res
       //Get No of user posts information
     
      this.postsCount=0;      

      this.homeService.getUserPostDeatils(this.auth?this.auth:'')
      .subscribe((data:any) => { 
       this.postsCount=data["files"].length;});

     this.networkService.getFriendsList(this.postsCount.toString()).subscribe((res:userRes[]) => {

      if(res.length>0){
      
      const index = res.findIndex(item => item.firstname=== this.auth);
      if (index > -1) {
        res.splice(index, 1);
      }  
      this.userInfo=res;
      
      for(let i=0; i<this.userInfo.length; i++) {
       // console.log(res[i].firstname);
        //Checking friends requests
        
        this.networkService.requestPending(this.auth?this.auth:'',res[i].firstname,)
        .subscribe((resResult:FriendsListRes[]) =>{
         
          if(resResult.length>0)
          {            
           this.buttonActivation(resResult[0].requestStatus);
            this.NetworkUserResponse.push({'_id':res[i]._id,'image':res[i].image,
            'RequestUserfirstname':res[i].firstname,
            'RequestUserlastname':res[i].lastname,'RequestStatus':resResult[0].requestStatus,
            'pendingstatus':this.RequestSendingStatus,'sendStatus':this.RequestSendingStatus,
            'acceptStatus':this.RequestAcceptStatus,'rejectStatus':this.RequestRejectStatus   }); 
          }
           else
           this.NetworkUserResponse.push({'_id':'0','image':res[i].image,
          'RequestUserfirstname':res[i].firstname,
          'RequestUserlastname':res[i].lastname,'RequestStatus':'',
          'pendingstatus':false,'sendStatus':false,
           'acceptStatus':true,'rejectStatus':true}); 
        }) ;  
      }
    }
     });
 
    
      }),(err:any[])=>{            
                this.router.navigate(['/login']); 
            }
    }
    
    RequestPending(requestId: string):void{         
      this.networkService.requestPending(this.auth?this.auth:'',requestId)
      .subscribe((res:any[]) =>{console.log(res);}) ;     

    } 
    SendFriendRequest(requestId: string) {
     // console.log(requestId);
      this.networkService.sendRequest(this.auth?this.auth:'',requestId,this.RequestStatus[0])
      .subscribe((res:any[]) =>{console.log(res);}) ; 
    }
  
    AcceptFriendsRequest(requestId: string) {
      this.networkService.acceptRequest(requestId,this.auth?this.auth:'',this.RequestStatus[1])
      .subscribe((res:any[]) =>{console.log(res);}) ;
    }
  
    RejectFriendsRequest(requestId: string) {
      console.log(requestId+this.auth);
      this.networkService.acceptRequest(requestId,this.auth?this.auth:'',this.RequestStatus[2])
      .subscribe((res:any[]) =>{console.log(res);}) ;      

    }

    buttonActivation(buttonAction:string):void{
      switch(buttonAction){
        case "SEND":
          console.log('send');
          this.RequestPendingStatus=false;
          this.RequestSendingStatus=true;
          this.RequestAcceptStatus=false;
          this.RequestRejectStatus=false;      
          break ;
          case "RECEIVE":
           break ;
          case "ACCEPT":            
          this.RequestPendingStatus=true;
          this.RequestSendingStatus=true;
          this.RequestAcceptStatus=true;
          this.RequestRejectStatus=false;
          break ;
          case "REJECT":
            this.RequestPendingStatus=false;
            this.RequestSendingStatus=false;
            this.RequestAcceptStatus=false;
            this.RequestRejectStatus=false;
           break ;
           default:
            this.RequestPendingStatus=true;
            this.RequestSendingStatus=true;
            this.RequestAcceptStatus=false;
            this.RequestRejectStatus=false;

            break ;
      }    
      
    }

submitForm(Form:NgForm):void{}

}
