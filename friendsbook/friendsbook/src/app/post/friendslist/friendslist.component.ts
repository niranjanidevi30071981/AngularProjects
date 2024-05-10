import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpEventType,HttpResponse } from '@angular/common/http';
import { LoginService } from 'src/app/login/login.service';
import { userRes } from '../../login/login.model';
import {UsersList,FriendsListRes} from '../networkpage/networkpage.model';
import {NetworkService} from '../networkpage/networkpage.service'
import {HomeService} from '../home/home.service';



@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.css']
})
export class FriendslistComponent implements OnInit {


  token:string|null = '';
  auth:string|null ='';
  imageName:string|null='';
  role:string|null='';
  connectionsCount:string|null='0';
  postsCount:string|null = '0';
  userImage:string='';
  Users:UsersList[]=[];

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
      
      this.token = localStorage.getItem('Token_Number');
      this.auth = localStorage.getItem('firstname');      
      this.imageName = localStorage.getItem('imageName');
      this.postsCount=localStorage.getItem('postCount');
      this.connectionsCount=localStorage.getItem('ConnectionsCount');
      this.role=localStorage.getItem('roleType');

      this.loginService.getUserInfo(this.token?this.token:'',this.auth?this.auth:'',
      this.imageName?this.imageName:'',this.role?this.role:'')
      .subscribe((res:userRes) => {
       
         //Valid User
         this.homeService.getUserPostDeatils(this.auth?this.auth:'')
         .subscribe((data:any) => { 
          this.postsCount=data["files"].length;});             
   
          this.networkService.getFriendsList(this.postsCount?this.postsCount:'').subscribe((res:userRes[]) => {
            const index = res.findIndex(item => item.firstname=== this.auth);         

            if (index > -1) {
              res.splice(index, 1);
            }  

            for(let i=0; i<this.userInfo.length; i++) {
             
              this.networkService.requestPendingAsperStatus(this.auth?this.auth:'',res[i].firstname,'ACCEPT')
              .subscribe((resResult:FriendsListRes[]) =>{
               // localStorage.setItem('ConnectionsCount',resResult.length.toString());               

                for(let j=0; j<resResult.length; j++) {
                  this.userInfo.push(res[i]);    
                   }
             
                     
              });      
            }
           this.connectionsCount =this.userInfo.length.toString();     
          });

       //Valid User
      }),(err:any[])=>{            
        this.router.navigate(['/login']); 


    }  

    }
  
  
 
submitForm(Form:NgForm):void{}

}


