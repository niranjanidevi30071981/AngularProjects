import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePasswordService } from './changepassword.service';
import { IPassword } from './changepassword.model';
import { LoginService } from 'src/app/login/login.service';
import { userRes } from '../../login/login.model';
import { Router } from '@angular/router';
import {ProfileSettingService} from '../profilesetting/profilesetting.service';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {  

  changePasswordErrorMsg:string ='';
  passwordStatus:boolean =false ;
  
  token:string|null = '';
  auth:string|null ='';
  imageName:string|null='';
  role:string|null='';
  id:string='';
 
  myChangePassword = new IPassword('','');
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


  constructor(private router:Router,private profileSettinService:ProfileSettingService,private changepasswordService:ChangePasswordService,private loginservice:LoginService) { }
    ngOnInit(): void {   
      this.token = localStorage.getItem('Token_Number');
      this.auth = localStorage.getItem('firstname');      
      this.imageName = localStorage.getItem('imageName');

      this.role=localStorage.getItem('roleType');

      this.loginservice.getUserInfo(this.token?this.token:'',this.auth?this.auth:'',
      this.imageName?this.imageName:'',this.role?this.role:'')
      .subscribe((res:userRes) => {

        this.profileSettinService.getregisterUser(this.auth?this.auth:'').subscribe((data:userRes[]) => { 
       //this.userInfo=data;
       this.id=data[0]._id;      

         });
      }),
      (err:any[])=>{            
      this.router.navigate(['/login']); };  
    }
  
    
  passwordcompare(value:string):void{   
       
    //alert(this.myEmployee.password );
   // alert(value );
      if(this.myChangePassword.password !== value && 
        this.myChangePassword.password.length !==value.length )
      {
         this.passwordStatus= false;
        //alert("true"+this.passwordStatus);
      }
      else if(this.myChangePassword.password === value && 
        this.myChangePassword.password.length ===value.length)
      {
           this.passwordStatus=true;  
          // alert(this.passwordStatus);
      } 
      else
      this.passwordStatus=false;
    
  }

    submitForm(Form:NgForm):void{
      console.log(Form.value);
      this.changepasswordService.UpdatePassword(Form.value,this.id)
      .subscribe((res:any[]) => {
        this.changePasswordErrorMsg="password is updated successfully";
        console.log(res)}) ,
        (err:any[])=>{            
          this.changePasswordErrorMsg="change password got an error"+err; };  
        
      }
      
}
