import { Component ,OnInit} from '@angular/core';
import { IResetPassword } from './resetpassword.model';
import { ILogin, LoginRes,userRes } from './../login/login.model'
import { Router } from '@angular/router';
import { ResetPasswrodSevice } from './resetpassword.service';
import { LoginService } from  './../login/login.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private loginService:LoginService,private resetPasswordService:ResetPasswrodSevice,
    private router:Router){}

    token:string|null = '';
    auth:string|null = '';
    imageName:string|null = '';
    role:string|null=''
    resetErrorMessage:string='';
    resetPassword=new IResetPassword('','');   
    
  userInfo:userRes={
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
  };


    ngOnInit(): void {
      this.token = localStorage.getItem('Token_Number');
      this.auth= localStorage.getItem('firstname');
      this.imageName= localStorage.getItem('imageName');
      
      this.role=localStorage.getItem('roleType');

      this.loginService.getUserInfo(this.token?this.token:'',this.auth?this.auth:'',
      this.imageName?this.imageName:'',this.role?this.role:'')
      .subscribe((res:userRes) => {
        this.userInfo = res        
      }),(err:any[])=>{            
                this.router.navigate(['/login']); 
            }
    }
    submitForm(Form:NgForm):void{
      console.log(Form.value)

      this.resetPasswordService.ResetPassword(Form.value)
      .subscribe((res:any[]) => {        
        this.router.navigate(['/home']); 

    }),(err:any[])=>{
      this.resetErrorMessage = "Please Enter Valid Information"
  }
  }

}
