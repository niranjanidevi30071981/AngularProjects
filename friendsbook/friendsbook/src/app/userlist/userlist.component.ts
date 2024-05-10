import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpEventType,HttpResponse } from '@angular/common/http';
import { LoginService } from 'src/app/login/login.service';
import { userRes} from '../login/login.model';
import {HomeService} from '../post/home/home.service';
import {UsersList} from '../post/networkpage/networkpage.model';
import {UserListService} from './userlist.service'
import {FriendsListRes} from '../post/networkpage/networkpage.model';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  
  token:string|null = '';
  auth:string|null ='';
  imageName:string|null='';
  connectionsCount:number=0;
  postsCount:string|null = '0';
  role:string|null='';
  userImage:string='';
  Users:UsersList[]=[];
  showEdit:boolean=false;
  btnVisible:boolean=true;
  UpdatedPassword:string='';

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



  constructor(private loginService:LoginService,private homeService:HomeService,private userlistService:UserListService,
    private router:Router){}

    ngOnInit(): void {
      //token validation
      this.token = localStorage.getItem('Token_Number');
      this.auth = localStorage.getItem('firstname');      
      this.imageName = localStorage.getItem('imageName');      
      this.role=localStorage.getItem('roleType');

      this.loginService.getUserInfo(this.token?this.token:'',this.auth?this.auth:'',
      this.imageName?this.imageName:'',this.role?this.role:'')
      .subscribe((res:userRes) => {
       
        this.homeService.getUserPostDeatils(this.auth?this.auth:'')
      .subscribe((data:any) => { 
       this.postsCount=data["files"].length;});

       this.homeService.getUserConnectionDeatils(this.auth?.toString()?this.auth:'')
      .subscribe((resResult:FriendsListRes[]) =>{
        localStorage.setItem('ConnectionsCount',resResult.length.toString());   
       this.connectionsCount= resResult.length;
       });      


        this.userlistService.getUserInfo(this.token?this.token:'',this.auth?this.auth:'',this.imageName?this.imageName:'')
        .subscribe((data:userRes[]) => {
          this.userInfo=data;
        });
        
    
      }),(err:any[])=>{            
                this.router.navigate(['/login']); 
            }
    }
    
    
submitForm(Form:NgForm):void{}

EditEmp() 
{
  this.showEdit=true;
  this.btnVisible=false;
  //console.log(this.btnVisible)       
}
UpdateEmp(_id:string,password:string,accountBlock:boolean) 
{     
  this.showEdit=false; 
  this.btnVisible=true;
  console.log(this.userInfo)
  const userInfoUpdated:any[]=[]; 
  userInfoUpdated.push({"password":password, "accountBlock":accountBlock})
  this.userlistService.updateUser(userInfoUpdated,_id)
  .subscribe((data:userRes[]) => {
    this.userInfo=data;
  });
}


}
